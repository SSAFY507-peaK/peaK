# Import Libraries
from pyspark.sql.types import StructType, StructField, StringType
import pyspark
from pyspark import SQLContext
from pyspark.sql.types import IntegerType, StructType, StructField, StringType
from pyspark.sql.functions import pandas_udf, monotonically_increasing_id
import pandas as pd
from tqdm import trange, notebook
import time
import datetime

# 긍부정 분석 모델
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

tokenizer = AutoTokenizer.from_pretrained("Woonn/bert-base-finetuned-emotion")

model = AutoModelForSequenceClassification.from_pretrained(
    "Woonn/bert-base-finetuned-emotion")

# build pipeline
classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)


# Define the schema of the DataFrame
schema = StructType([
    StructField("id", StringType(), True),
    StructField("username", StringType(), True),
    StructField("tweet", StringType(), True),
    StructField("retweets_count", IntegerType(), True),
    StructField("likes_count", IntegerType(), True)])
data_name = "bp_pop_kr"
# Load the text data into a DataFrame
df = spark_context.read.format("csv").schema(schema).option("header", True).option(
    "encoding", "UTF-8").load(f"file:///home/j8a507/cluster/twitter/{data_name}.csv")


# Define the schema of the DataFrame
schema = StructType([
    StructField("id", StringType(), True),
    StructField("username", StringType(), True),
    StructField("tweet", StringType(), True),
    StructField("retweets_count", IntegerType(), True),
    StructField("likes_count", IntegerType(), True)])
data_name = "bp_pop_kr"
# Load the text data into a DataFrame
df = spark_context.read.format("csv").schema(schema).option("header", True).option(
    "encoding", "UTF-8").load(f"file:///home/j8a507/cluster/twitter/{data_name}.csv")


@pandas_udf('float')
def sentiment_batch_udf(row: pd.Series) -> pd.Series:
    pipe = classifier(row.to_list(), truncation=True, batch_size=1)
    result = [round(sentiment['score'], 2) for sentiment in pipe]
    return pd.Series(result)


start = time.time()
result = df.select(df.tweet, sentiment_batch_udf(df.tweet).alias(
    "score")).withColumn("id", monotonically_increasing_id())
# result.write.option("header", True).option("encoding","UTF-8").format("csv").mode('overwrite').save("file:///home/j8a507/cluster/twitter/twitter_out/")
# result.write.option("header", True).option("encoding","UTF-8").csv("file:///home/j8a507/cluster/twitter/twitter_out/")

# write DataFrame to CSV file
result.coalesce(1).write.csv("twitter_out/", header=True)
end = time.time()

sec = (end - start)
execution_time = datetime.timedelta(seconds=sec)

# time_schema = StructType([StructField("exec_time", StringType(), True)])
t = ["execution_time", execution_time]
time_df = spark.sparkContext.parallelize([execution_time]).coalesce(
    1).saveAsTextFile("twitter_exec_time/")

# park_context.createDataFrame(spark.sparkContext.parallelize([limit]),StringType()).coalesce(1).write.format("text").mode("overwrite").save("twitter_exec_time/")
