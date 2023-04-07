from pymongo import MongoClient
from news_crawler import crawling as crawling_news
from twitter_crawler import crawling as crawling_twitter
import asyncio
import datetime as dt
import nest_asyncio


async def crawling():
    while True:
        cur_dt = dt.datetime.now() + dt.timedelta(hours=9)

        news_crawling_turn = not (cur_dt.minute % 10)
        twitter_crawling_turn = not (cur_dt.minute % 15)
        if not (news_crawling_turn or twitter_crawling_turn):
            continue

        cur_dt = cur_dt.replace(second=0, microsecond=0)

        client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
        db = client['peak']
        collection = db['idol']
        idols = [document for document in collection.find({}, {"idol": 1, "notations": 1})]

        tasks = []
        if news_crawling_turn:
            tasks.append(asyncio.create_task(crawling_news(idols, cur_dt)))
        if twitter_crawling_turn:
            tasks.append(asyncio.create_task(crawling_twitter(idols, cur_dt)))
        nest_asyncio.apply()
        await asyncio.gather(*tasks)
        await asyncio.sleep(60)


if __name__ == '__main__':
    asyncio.run(crawling())
