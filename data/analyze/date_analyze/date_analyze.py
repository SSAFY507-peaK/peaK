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
import glob
import json

date = sys.argv[1]

spark = SparkSession.builder.config("spark.sql.legacy.json.allowEmptyString.enabled", True).getOrCreate()
sc=spark.sparkContext

hdfs_path_rd = f"output/RD/{date}_RD.txt"
local_path_rd = f"file:///home/j8a507/watcher/analyzed/rank/RD/{date}_RD.txt"

hdfs_path_rh = "hdfs://output/RH/"

file_pattern = f"{date}_26.txt"

rankdate_df = spark.read.json(f"output/RH/{date}*.txt")
rankdate_df = rankdate_df.groupBy("idol").agg(F.sum("rank_score").alias("rank_score"))
final_df = rankdate_df.sort(rankdate_df.rank_score.desc()).withColumn("rank",monotonically_increasing_id()+1 )

result_rdd = final_df.rdd.map(lambda x: {"idol": x[0], "rank_score": x[1], "rank": x[2]})
result_json = result_rdd.collect()
result_json = json.dumps(result_json, ensure_ascii=False)
final_result_rdd = sc.parallelize([result_json])
final_result_rdd.saveAsTextFile(hdfs_path_rd)

subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_rd, local_path_rd])

hdfs_path_pd = f"output/PD/{date}_PD.txt"
local_path_pd = f"file:///home/j8a507/watcher/analyzed/twitter/PD/{date}_PD.txt"

hdfs_path_pn = "hdfs://output/PN/"
file_pattern = f"{date}*.txt"

pn_df = spark.read.json(f"output/PN/{date}*.txt")
final_df = pn_df.groupBy("idol").agg(F.avg("pos_neg").cast(IntegerType()).alias("pos_neg"))

result_rdd = final_df.rdd.map(lambda x: {"idol": x[0], "pos_neg": x[1]})
result_json = result_rdd.collect()
result_json = json.dumps(result_json, ensure_ascii=False)
final_result_rdd = sc.parallelize([result_json])

final_result_rdd.saveAsTextFile(hdfs_path_pd)
subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_pd, local_path_pd])