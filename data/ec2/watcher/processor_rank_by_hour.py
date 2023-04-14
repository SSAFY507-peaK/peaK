from pymongo import MongoClient
import datetime as dt
import json
import requests


def process(path, date_time):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    date_time = (dt.datetime.fromisoformat(date_time) - dt.timedelta(hours=9)).isoformat()

    print("RH Start")
    client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
    db = client['peak']
    collection = db['idol']
    idol_set = set(
        document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1})
    )

    with open(path, 'r', encoding='utf-8') as f:
        idols = []
        for line in f.readlines()[1:-3]:
            rank_by_hour = json.loads(line.rstrip('\n,'))
            if rank_by_hour['idol'] not in idol_set:
                continue
            rank_by_hour['score'] = rank_by_hour['rank_score']
            rank_by_hour.pop('rank_score')
            idol_set.remove(rank_by_hour['idol'])
            idols.append(rank_by_hour)
        standard_rank = len(idols) + 1
        for idol in idol_set:
            idols.append({"idol": idol, "rank": standard_rank, "score": 0})
        response = session.post(
            'http://localhost:8093/peak/rank-hour',
            data=json.dumps(
                {
                    "date_time": date_time,
                    "idols": idols
                },
                ensure_ascii=False
            ).encode('utf-8')
        )
        if response.status_code != 200:
            print(response.content)
            print(f'{date_time} 아이돌 랭킹 전송 실패')
        else:
            print(f'{date_time} 아이돌 랭킹 전송 성공')
    print("RH End")
