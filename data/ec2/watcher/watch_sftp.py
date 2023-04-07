from functools import wraps
from pymongo import MongoClient
from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer
import datetime
import json
import os
import pysftp
import requests
import threading
import time

# 아래는 적절한 입력 필요
hostname = host_name
username = user_name
pem_path = pem_path
target_directory_path = path


# Function to transfer from API server to Cluster
def sftptransfer(src_path):
    cnopts = pysftp.CnOpts()
    cnopts.hostkeys = None
    filename = os.path.basename(src_path)
    split_filename = filename.split("_")
    date = split_filename[0]
    hour = split_filename[1]

    with pysftp.Connection(hostname, username=username, private_key=pem_path, cnopts=cnopts) as sftp:
        if filename.find("TC") >= 0:
            sftp.put(src_path, f'watcher/crawled/twitter/PN/{date}_{hour}_TC.txt')
        elif filename.find("NC") >= 0:
            sftp.put(src_path, f'watcher/crawled/news/TK/{date}_{hour}_NC.txt')
        print(f'Successfully sent {filename}!!')
        sftp.close()


def debounce(delay):
    def decorator(func):
        @wraps(func)
        def debounced(*args, **kwargs):
            with decorator.lock:
                last_call_time = getattr(func, 'last_call_time', None)
                current_time = time.time()
                if last_call_time is None or (current_time - last_call_time) > delay:
                    func.last_call_time = current_time
                    datetime.datetime.fromtimestamp(func.last_call_time)
                    time.sleep(10)
                    return func(*args, **kwargs)

        return debounced

    decorator.lock = threading.Lock()
    return decorator


class TestEventHandler(PatternMatchingEventHandler):
    def __init__(self, type, *args, **kwargs, ):
        super(TestEventHandler, self).__init__(*args, **kwargs)
        self.last_created = None
        self.type = type

    @debounce(1)
    def on_created(self, event):
        filename = os.path.basename(event.src_path)
        split_filename = filename.split("_")
        if len(split_filename) == 3:
            date = split_filename[0]
            hour = split_filename[1]
        else:
            date = split_filename[0]

        if self.type == "input":
            path = event.src_path
            if path != self.last_created and event.src_path.find('~') == -1:
                self.last_created = path
                print(f'{filename} analyzed!')

                headers = {'Content-type': 'application/json'}
                session = requests.Session()
                session.headers.update(headers)

                if len(split_filename) == 3:
                    date_time = datetime.datetime(
                        year=int(f'20{date[:2]}'),
                        month=int(f'{date[2:4]}'),
                        day=int(f'{date[4:6]}'),
                        hour=int(hour)
                    ).isoformat()
                else:
                    date = datetime.datetime(
                        year=int(f'20{date[:2]}'),
                        month=int(f'{date[2:4]}'),
                        day=int(f'{date[4:6]}')
                    ).isoformat()

                if filename.find("NK") >= 0:
                    if os.path.exists(f'./analyzed/news/NK/{filename}'):
                        print("NK Start")
                        with open(f'./analyzed/news/NK/{filename}', 'r', encoding='utf-8') as f:
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
                elif filename.find("TK") >= 0:
                    if os.path.exists(f'./analyzed/news/TK/{filename}'):
                        print("TK Start")
                        with open(f'./analyzed/news/TK/{filename}', 'r', encoding='utf-8') as f:
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
                elif filename.find("IN") >= 0:
                    if os.path.exists(f'./analyzed/news/IN/{filename}'):
                        print("IN Start")
                        with open(f'./analyzed/news/IN/{filename}', 'r', encoding='utf-8') as f:
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
                elif filename.find("PD") >= 0:
                    if os.path.exists(f'./analyzed/twitter/PD/{filename}'):
                        print("PD Start")
                        client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
                        db = client['peak']
                        collection = db['idol']
                        idol_set = set(
                            document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1}))

                        with open(f'./analyzed/twitter/PD/{filename}', 'r', encoding='utf-8') as f:
                            for pos_neg in json.loads(f.read()):
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
                        pritn("PD End")
                elif filename.find("RD") >= 0:
                    if os.path.exists(f'./analyzed/rank/RD/{filename}'):
                        print("RD Start")
                        client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
                        db = client['peak']
                        collection = db['idol']
                        idol_set = set(
                            document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1}))

                        with open(f'./analyzed/rank/RD/{filename}', 'r', encoding='utf-8') as f:
                            idols = []
                            for rank_by_day in json.loads(f.read()):
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
                elif filename.find("RH") >= 0:
                    if os.path.exists(f'./analyzed/rank/RH/{filename}'):
                        print("RH Start")
                        client = MongoClient('mongodb://idol:dkdlehf@localhost:27017/peak')
                        db = client['peak']
                        collection = db['idol']
                        idol_set = set(
                            document['idol'] for document in collection.find({}, {"idol": 1, "notations": 1}))

                        with open(filename, 'r', encoding='utf-8') as f:
                            idols = []
                            for rank_by_hour in json.loads(f.read()):
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
                                        "date": date,
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
        else:
            sftptransfer(event.src_path)


if __name__ == "__main__":
    print('Starting watcher application...')
    input_directory_path = 'analyzed'
    output_directory_path = 'crawled'
    observers = []

    input_event_handler = TestEventHandler(patterns=["*.txt"], type="input")
    input_observer = Observer()
    input_observer.schedule(input_event_handler, input_directory_path, recursive=True)
    observers.append(input_observer)
    input_observer.start()

    output_event_handler = TestEventHandler(patterns=["*.txt"], type="output")
    output_observer = Observer()
    output_observer.schedule(output_event_handler, output_directory_path, recursive=True)
    observers.append(output_observer)
    output_observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        for o in observers:
            o.unschedule_all()
            o.stop()
    for o in observers:
        o.join()


