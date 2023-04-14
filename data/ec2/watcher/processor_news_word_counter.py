import json
import requests


def process(path, date_time):
    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    print("NK Start")
    with open(path, 'r', encoding='utf-8') as f:
        for news in json.loads(f.read()):
            index = news['index']
            idol = news['idol']
            word_counter = dict(news['keywords'])
            response = session.post(
                'http://localhost:8093/news/word-counter',
                data=json.dumps(
                    {
                        "index": index,
                        "date_time": date_time,
                        "idol": idol,
                        "word_counter": word_counter
                    },
                    ensure_ascii=False
                ).encode('utf-8')
            )

            if response.status_code == 200:
                print(f"뉴스 인덱스 {index}: word counter 전송 성공")
                response_to_all_idol_news_list = session.post(
                    'http://localhost:8093/news/list/article/all-idol',
                    data=json.dumps(
                        {
                            "index": index,
                            "date_time": date_time,
                            "idol": idol
                        },
                        ensure_ascii=False
                    ).encode('utf-8')
                )
                if response_to_all_idol_news_list.status_code != 200:
                    print(response_to_all_idol_news_list.content)
                    print(f"뉴스 인덱스 {index}: 종합 아이돌 뉴스 목록에 추가 실패")
                else:
                    print(f"뉴스 인덱스 {index}: 종합 아이돌 뉴스 목록에 추가 성공")

                response_to_idol_news_list = session.post(
                    'http://localhost:8093/news/list/article/idol',
                    data=json.dumps(
                        {
                            "index": index,
                            "date_time": date_time,
                            "idol": idol
                        },
                        ensure_ascii=False
                    ).encode('utf-8')
                )
                if response_to_idol_news_list.status_code != 200:
                    print(response_to_idol_news_list.content)
                    print(f"뉴스 인덱스 {index}: 아이돌 뉴스 목록에 추가 실패")
                else:
                    print(f"뉴스 인덱스 {index}: 아이돌 뉴스 목록에 추가 성공")
            else:
                print(response.content)
                print(f"뉴스 인덱스 {index}: 키워드 전송 실패")
    print("NK End")
