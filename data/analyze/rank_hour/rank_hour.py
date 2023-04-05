# Import Libraries
import pyspark
from pyspark import SQLContext
from pyspark.sql.types import IntegerType, StructType, StructField, StringType
from pyspark.sql.functions import pandas_udf, monotonically_increasing_id , from_json,col, avg,coalesce,when, monotonically_increasing_id 
import pandas as pd
import pyspark.sql.functions as F
from tqdm import trange, notebook
import time
import datetime
import re
import subprocess
import sys
import json

date = sys.argv[1]
hour = sys.argv[2]

spark = SparkSession.builder.config("spark.sql.legacy.json.allowEmptyString.enabled", True).getOrCreate()
sc=spark.sparkContext

# 뉴스 기사 가중치
news_weight = 50

# Hdfs 경로
hdfs_path_count = f"output/IDK/{date}_{hour}_IDK.txt"
hdfs_path_tweet = f"output/PN/{date}_{hour}_PN.txt"

schema = StructType([
    StructField("idol", StringType(), True),
    StructField("count", IntegerType(), True),
])

cdf = spark.read.schema(schema).option("header", True).csv(hdfs_path_count).withColumnRenamed("count", "news_count")

# idol | news_count
cdf = cdf.withColumn("news_count", col("news_count") * news_weight)


# idol_t | pop_neg | action_count
tdf = spark.read.json(hdfs_path_tweet).withColumnRenamed("idol", "idol_t")

# idol | news_count | pos_neg | action_count
jdf = cdf.join(tdf, tdf.idol_t == cdf.idol, "inner").select("idol", "news_count", "pos_neg", "action_count")

# idol | rank_score | rank
hdfs_path_rank = f"output/RH/{date}_{hour}_RH.txt"
local_path_rank = f"file:///home/j8a507/watcher/analyzed/rank/RH/{date}_{hour}_RH.txt"

rdf = jdf.groupBy("idol").agg(F.sum(jdf.news_count + jdf.pos_neg + jdf.action_count).cast(IntegerType()).alias("rank_score"))
final_df = rdf.sort(rdf.rank_score.desc()).withColumn("rank",monotonically_increasing_id()+1 )

result_rdd = final_df.rdd.map(lambda x: {"idol": x[0], "rank_score": x[1], "rank": x[2]})
result_json = result_rdd.collect()
result_json = json.dumps(result_json, ensure_ascii=False)
final_result_rdd = sc.parallelize([result_json])
final_result_rdd.saveAsTextFile(hdfs_path_rank)

subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_rank, local_path_rank])