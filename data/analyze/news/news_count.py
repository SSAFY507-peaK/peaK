import pyspark
from pyspark.sql import SparkSession
import string
from pecab import PeCab
import pandas as pd
import numpy as np
from collections import Counter
from pyspark.sql.functions import pandas_udf, monotonically_increasing_id, regexp_replace, sum, asc, \
                                   arrays_zip, col, explode, sort_array, struct, lit, PandasUDFType, coalesce, \
                                    concat

from pyspark.sql.types import StructType, StructField, StringType, MapType, ArrayType, IntegerType
import re
import subprocess
import sys
import json
import pyspark.sql.functions as F
# local[*] : 모든 코어를 사용하겠다, local[4] : 4개의 코어를 사용하겠다.

spark = SparkSession.builder.getOrCreate()
sc=spark.sparkContext


date = sys.argv[1]
hour = sys.argv[2]

data_name= f"{date}_{hour}_NC.txt"
origin_df = spark.read.options(header='True', inferSchema='True', delimiter='|',quote='"', multiLine="true") \
                        .option("encoding", "UTF-8").csv(f"file:///home/j8a507/watcher/crawled/news/{data_name}")

@pandas_udf(StringType())
def rm_space_in_quote_udf(x: pd.Series) -> pd.Series:
    def rm_space_in_quote(string):
        encoded_string = string.encode('utf-8')
        decoded_string = encoded_string.decode('utf-8')
        no_space_string = re.sub(r"'[^']*'", lambda m: m.group().replace(" ", ""), decoded_string)
        return no_space_string

    return x.apply(rm_space_in_quote)

df =  origin_df.withColumn("total_content", concat(col("content"), col("summary"), col("title")))\
    .select(col("idol"),col("total_content"))

df = df.withColumn("total_content", rm_space_in_quote_udf(df["total_content"]))

user_dict= {'(여자)아이들', '(G)I-DLE', 'AB6IX', '에이비식스', 'ASTRO', '아스트로', 'ATBO', '에이티비오', 'ATEEZ', '에이티즈', 'Apink', '에이핑크', 'BAE173', '비에이이일칠삼/173', 'BDC', '비디씨', 'BLACKPINK', '블랙핑크', 'CIX', '씨아이엑스', 'CLASS:y', '클라씨', 'CNBLUE',\
            'CRAVITY', '크래비티', 'DAY6', '데이식스', 'DRIPPIN', '드리핀', 'ENHYPEN', '엔하이픈', 'EPEX', '이펙스', 'EVERGLOW', '에버글로우', 'EXID', '이엑스아이디', 'EXO', '엑소', 'GOT7', '갓세븐', 'ITZY', '있지', 'IVE', '아이브', 'KARD', '카드', 'LESSERAFIM', '르세라핌', 'LIGHTSUM', '라잇썸', 'MCND', '엠씨엔디', 'NCT', '엔시티', \
            'NCT127', '엔시티127', 'NCTDREAM', '엔시티드림', 'NMIXX', '엔믹스', 'NewJeans', '뉴진스', 'P1Harmony', '피원하모니', 'RedVelvet', '레드벨벳', 'SF9', '에스에프나인', 'SHINee', '샤이니', 'StrayKids', '스트레이키즈', 'TEMPEST', '템페스트', 'TREASURE', '트레저', 'TWICE', '트와이스', 'VERIVERY', '베리베리', 'VICTON', '빅톤', 'WINNER',\
            '위너', 'Weeekly', '위클리', 'XdinaryHeroes', '엑스디너리히어로즈', 'YOUNITE', '유나이트', 'aespa', '에스파', 'iKON', '아이콘', '골든차일드', ' GNCD', '공원소녀', 'GirlsInThePark', 'GWSN', '다크비', 'DKB', '더보이즈', 'THEBOYZ', 'LABOUM', '라붐', '레이디스코드', "LADIES'CODE", '로켓펀치', ' RCPC', '마마무', 'MAMAMOO', '모모랜드',\
            'MOMOLAND', '몬스타엑스', 'MONSTAX', '미래소년', 'MIRAE', '박지훈', 'PARKJIHOON', '방탄소년단', 'BTS', '브레이브걸스', 'BraveGirls', '블락비', 'BlockB', 'BLACKSWAN', '블랙스완', 'BTOB', '비투비', 'VIXX', '빅스', '세븐틴', 'SEVENTEEN', '소녀시대', "Girls'Generation", '아이유', ' IU ', '앤씨아', 'NC.A', ' 업텐션', ' UP10TION', '엔플라잉',\
            'N.Flying', '오마이걸', 'OHMYGIRL', '온앤오프', 'ONF', '우주소녀', 'WJSN', '원어스', 'ONEUS', 'ONEWE', '원위', '위키미키', 'WekiMeki', '유키스', 'U-KISS', '이달의소녀', 'LOOΠΔ', '인피니트', 'INFINITE', '주니엘', 'JUNIEL', '청하', 'CHUNGHA', '체리블렛', 'CherryBullet', '퀸즈아이', 'QueenzEye', '투모로우바이투게더', 'TXT', 'TOMORROWXTOMORROW'\
            '틴탑', 'TEENTOP', '퍼플키스', 'PURPLEKISS', '펜타곤', 'PENTAGON', '프로미스나인', 'fromis_9', '걸그룹', '소속사','엔터테인먼트'}


# 사용자 정의사전 만들기
@pandas_udf(ArrayType(StringType()))
def make_user_dict_udf(x: pd.Series) -> pd.Series:
    def make_user_dict(string):
        encoded_string = string.encode('utf-8')
        decoded_string = encoded_string.decode('utf-8')
        substrings = re.findall(r"'(.*?)'", decoded_string)
        return substrings
    return x.apply(make_user_dict)

df_dict = df.select("total_content")
df_dict= df_dict.withColumn("total_content", make_user_dict_udf(df["total_content"]))
# df_dict.collect()
for w in df_dict.toLocalIterator():
    user_dict.update(w["total_content"])

pecab = PeCab(user_dict=user_dict)

@pandas_udf(StringType())
def clean_str_udf(x: pd.Series) -> pd.Series:
    def clean_str(x):
        punc = string.punctuation
        for ch in punc:
            x = x.replace(ch, '')
        return x
    return x.apply(clean_str)

df = df.withColumn("total_content", clean_str_udf(df["total_content"]))

def set_words(words):
    counter = Counter(words)
    return counter.most_common(10)

def nouns_row(x):
    content = x[1]
    nouns = pecab.nouns(content)
    return (x[0], nouns)

def set_words_row(x):
    keywords = x[1]
    counter = Counter(keywords)
    return (x[0], counter.most_common(10))

words_rdd = df.rdd
words_rdd = words_rdd.map(lambda x : nouns_row(x))
words_rdd = words_rdd.map(lambda x: set_words_row(x))

total_rdd = words_rdd.flatMap(lambda x: x[1]).reduceByKey(lambda x, y: x + y).sortBy(lambda x: x[1], ascending=False)
words_rdd = words_rdd.zipWithIndex()

# date = sys.argv[1]
# hour = sys.argv[2]
date = "20230401"
hour= "21"

# Replace "/path/to/partitioned/data" with the path to your partitioned data in HDFS
hdfs_path_keyword = f"output/NK/{date}_{hour}_NK.txt"
hdfs_path_total = f"output/TK/{date}_{hour}_TK.txt"
hdfs_path_count = f"output/IDK/{date}_{hour}_IDK.txt"

# Replace "/path/to/local/directory" with the path to your local directory
local_path_keyword = f"file:///home/j8a507/watcher/analyzed/news/NK/{date}_{hour}_NK.txt"
local_path_total = f"file:///home/j8a507/watcher/analyzed/news/TK/{date}_{hour}_TK.txt"
local_path_count = f"file:///home/j8a507/watcher/analyzed/news/IDK/{date}_{hour}_IDK.txt"

total_dict = total_rdd.collect()
total_json = json.dumps(total_dict, ensure_ascii=False)

words_rdd = words_rdd.map(lambda x: {"index": x[1], "idol": x[0][0], "keywords": x[0][1]})
words_json = words_rdd.collect()
words_json = json.dumps(words_json, ensure_ascii=False)

final_total_rdd = sc.parallelize([total_json])
final_words_rdd = sc.parallelize([words_json])

final_words_rdd.saveAsTextFile(hdfs_path_keyword)
final_total_rdd.saveAsTextFile(hdfs_path_total)

cdf = origin_df.groupBy("idol").count()
cdf.write.option("header", True).csv(hdfs_path_count)

subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_count, local_path_count])
subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_keyword, local_path_keyword])
subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_total, local_path_total])


words_df = words_rdd.toDF(["idol","index", "keywords"])
df_exploded = words_df.select(col("idol"), explode(col("keywords")).alias("keyword"))

idol_keyword_counts = df_exploded.groupBy(col("idol"), col("keyword._1").alias("keyword")).agg(F.sum(col("keyword._2")).alias("count"))

result = (
    idol_keyword_counts
    .sort(F.desc("count"))
    .groupBy("idol")
    .agg(F.collect_list(F.struct(col("keyword"), col("count"))).alias("keywords"))
    .withColumn("keywords", F.expr("slice(keywords, 1, 10)"))
)

hdfs_path_in = f"output/IN/{date}_{hour}_IN.txt"
local_path_in = f"file:///home/j8a507/watcher/analyzed/news/IN/{date}_{hour}_IN.txt"


result_rdd = result.rdd.map(lambda x: {"idol": x[0], "keywords": x[1]})
result_json = result_rdd.collect()
result_json = json.dumps(result_json, ensure_ascii=False)
final_result_rdd = sc.parallelize([result_json])
final_result_rdd.saveAsTextFile(hdfs_path_in)

subprocess.check_call(["hdfs", "dfs", "-getmerge", hdfs_path_in, local_path_in])

local_complete_path = f"file:///home/j8a507/watcher/sync/{date}_{hour}_sync_n.txt"

with open(local_complete_path, 'w') as file:
    file.write("news completed")