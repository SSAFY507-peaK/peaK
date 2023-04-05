# Import Libraries
import pyspark
from pyspark import SQLContext
from pyspark.sql.types import IntegerType, StructType, StructField, StringType
from pyspark.sql.functions import pandas_udf, monotonically_increasing_id , from_json,col, avg
import pandas as pd
import pyspark.sql.functions as F
from tqdm import trange, notebook
import time
import datetime
import re
import sys
import subprocess
import json

spark = SparkSession.builder..config("spark.sql.legacy.json.allowEmptyString.enabled", True).getOrCreate()

sc=spark.sparkContext

date = sys.argv[1]
hour = sys.argv[2]

schema = StructType([
    StructField("idol", StringType(), True),
    StructField("tweet", StringType(), True),
    StructField("retweets_count", IntegerType(), True),
    StructField("likes_count", IntegerType(), True),
])
data_name = f"{date}_{hour}_TC.txt"
tdf = spark.read.schema(schema).option("encoding", "UTF-8").option("allowNonUTF8", "true").option("multiLine","true").json(f"file:///home/j8a507/watcher/crawled/twitter/{data_name}")

# 긍부정 분석 모델
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

tokenizer = AutoTokenizer.from_pretrained("Woonn/bert-base-finetuned-emotion")

model = AutoModelForSequenceClassification.from_pretrained("Woonn/bert-base-finetuned-emotion")

# build pipeline
classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@pandas_udf('float')
def sentiment_batch_udf(row: pd.Series) -> pd.Series:
  pipe = classifier(row.to_list(), truncation=True, batch_size=2)
  result = [round(sentiment['score'], 2) for sentiment in pipe]
  return pd.Series(result)

result = tdf.select(tdf.idol, tdf.likes_count, tdf.retweets_count, sentiment_batch_udf(tdf.tweet).alias("score"))

# 모델 메모리 해제
del tokenizer
del model
del classifier

adf = tdf.select(tdf.idol.alias("idol_a"), tdf.likes_count, tdf.retweets_count)
adf = adf.groupBy("idol_a").agg((F.sum("likes_count") + F.sum("retweets_count")).alias("action_count"))

pdf = result.groupBy("idol").agg((avg("score")*100).cast("int").alias("pos_neg"))
                              
final_df = pdf.join(adf, adf.idol_a == pdf.idol, "inner").select("idol","pos_neg","action_count")


final_rdd = final_df.rdd.map(lambda x: {"index": x[0], "idol": x[1], "keywords": x[2]})
final_list = final_rdd.collect()
final_json = json.dumps(final_list, ensure_ascii=False)
final_json_rdd = sc.parallelize([final_json])

hdfs_path_pn = f"output/PN/{date}_{hour}_PN.txt"
local_path_pn = f"file:///home/j8a507/watcher/analyzed/twitter/PN/{date}_{hour}_PN.txt"

final_json_rdd.saveAsTextFile(hdfs_path_pn)
subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_pn, local_path_pn])

local_complete_path = f"file:///home/j8a507/watcher/sync/{date}_{hour}_sync_t.txt"

with open(local_complete_path, 'w') as file:
    file.write("twitter completed")