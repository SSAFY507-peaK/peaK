from pymongo import MongoClient
import json
import requests


def process(path, date):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    print("RD Start")
    client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
    db = client['peak']
    collection = db['idol']
    idol_set = set(
        document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1})
    )

    with open(path, 'r', encoding='utf-8') as f:
        idols = []
        for line in f.readlines()[1:-3]:
            rank_by_day = json.loads(line.rstrip('\n,'))
            if rank_by_day['idol'] not in idol_set:
                continue
            rank_by_day['score'] = rank_by_day['rank_score']
            rank_by_day.pop('rank_score')
            idol_set.remove(rank_by_day['idol'])
            idols.append(rank_by_day)
        standard_rank = len(idols) + 1
        for idol in idol_set:
            idols.append({"idol": idol, "rank": standard_rank, "score": 0})
        response = session.post(
            'http://localhost:8093/peak/rank-date',
            data=json.dumps(
                {
                    "date": date,
                    "idols": idols
                },
                ensure_ascii=False
            ).encode('utf-8')
        )
        if response.status_code != 200:
            print(response.content)
            print(f'{date} 아이돌 랭킹 전송 실패')
        else:
            print(f'{date} 아이돌 랭킹 전송 성공')
    print("RD End")
