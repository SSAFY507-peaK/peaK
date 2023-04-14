import json
import requests


def process(path, date_time):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    print("IN Start")
    with open(path, 'r', encoding='utf-8') as f:
        for news in json.loads(f.read()):
            idol = news['idol']
            keyword_counter = dict(news['keywords'])

            response = session.post(
                'http://localhost:8093/news/list/idol/keywords',
                data=json.dumps(
                    {
                        "date_time": date_time,
                        "idol": idol,
                        "keyword_counter": keyword_counter
                    },
                    ensure_ascii=False
                ).encode('utf-8')
            )

            if response.status_code != 200:
                print(response.content)
                print(f"{date_time}: 아이돌 {idol} 트렌딩 키워드 전송 실패")
            else:
                print(f"{date_time}: 아이돌 {idol} 트렌딩 키워드 전송 성공")
    print("IN End")
