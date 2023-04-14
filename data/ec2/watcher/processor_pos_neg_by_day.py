from pymongo import MongoClient
import json
import requests


def process(path, date):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    print("PD Start")
    client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
    db = client['peak']
    collection = db['idol']
    idol_set = set(
        document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1})
    )

    with open(path, 'r', encoding='utf-8') as f:
        for line in f.readlines()[1:-2]:
            pos_neg = json.loads(line.rstrip('\n,'))
            idol = pos_neg['idol']
            pos_neg_score = pos_neg['pos_neg']
            idol_set.remove(idol)

            response = session.post(
                'http://localhost:8093/idol/pos-neg',
                data=json.dumps(
                    {
                        "date": date,
                        "idol": idol,
                        "pos_neg_score": pos_neg_score
                    },
                    ensure_ascii=False
                ).encode('utf-8')
            )

            if response.status_code != 200:
                print(response.content)
                print(f'{idol} 긍부정 점수 전송 실패')
            else:
                print(f'{idol} 긍부정 점수 전송 성공')

        for idol in idol_set:
            response = session.post(
                'http://localhost:8093/idol/pos-neg',
                data=json.dumps(
                    {
                        "date": date,
                        "idol": idol,
                        "pos_neg_score": 50
                    },
                    ensure_ascii=False
                ).encode('utf-8')
            )

            if response.status_code != 200:
                print(response.content)
                print(f'{idol} 긍부정 점수 전송 실패')
            else:
                print(f'{idol} 긍부정 점수 전송 성공')
    print("PD End")
