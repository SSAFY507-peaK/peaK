import json
import requests


def process(path, date_time):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    print("TK Start")
    with open(path, 'r', encoding='utf-8') as f:
        keyword_counter = dict(eval(f.read()))
        response = session.post(
            'http://localhost:8093/news/list/all-idol/keywords',
            data=json.dumps(
                {
                    "date_time": date_time,
                    "keyword_counter": keyword_counter
                },
                ensure_ascii=False
            ).encode('utf-8')
        )
        if response.status_code != 200:
            print(response.content)
            print(f"{date_time}: 종합 아이돌 트렌딩 키워드 전송 실패")
        else:
            print(f"{date_time}: 종합 아이돌 트렌딩 키워드 전송 성공")
    print("TK End")
