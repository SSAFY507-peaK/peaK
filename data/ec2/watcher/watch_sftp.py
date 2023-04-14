from functools import wraps
from processor_all_idol_news_keyword_counter import process as tk
from processor_idol_news_keyword_counter import process as ik
from processor_news_word_counter import process as nw
from processor_pos_neg_by_day import process as pn
from processor_rank_by_day import process as rd
from processor_rank_by_hour import process as rh
from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer
import datetime
import os
import pysftp
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
            sftp.put(src_path, f'watcher/crawled/twitter/{date}_{hour}_TC.txt')
            #sftp.put(src_path, f'watcher/{date}_{hour}_TC.txt')
        elif filename.find("NC") >= 0:
            sftp.put(src_path, f'watcher/crawled/news/{date}_{hour}_NC.txt')
            #sftp.put(src_path, f'watcher/{date}_{hour}_NC.txt')
        elif filename.find("NE") >= 0:
            sftp.put(src_path, f'watcher/crawled/news/{date}_{hour}_NE.txt')
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
            hour = 0

        if self.type == "input":
            path = event.src_path
            if path != self.last_created and event.src_path.find('~') == -1:
                self.last_created = path
                print(f'{filename} analyzed!')

                date_time = datetime.datetime(
                    year=int(f'20{date[:2]}'),
                    month=int(f'{date[2:4]}'),
                    day=int(f'{date[4:6]}'),
                    hour=int(hour)
                ).isoformat()

                date = datetime.datetime(
                    year=int(f'20{date[:2]}'),
                    month=int(f'{date[2:4]}'),
                    day=int(f'{date[4:6]}')
                ).isoformat()

                if filename.find("NK") >= 0:
                    path = f'./analyzed/news/NK/{filename}'
                    if os.path.exists(path):
                        nw(path, date_time)
                elif filename.find("TK") >= 0:
                    path = f'./analyzed/news/TK/{filename}'
                    if os.path.exists(path):
                        tk(path, date_time)
                elif filename.find("IN") >= 0:
                    path = f'./analyzed/news/IN/{filename}'
                    if os.path.exists(path):
                        ik(path, date_time)
                elif filename.find("PD") >= 0:
                    path = f'./analyzed/twitter/PD/{filename}'
                    if os.path.exists(path):
                        pn(path, date)
                elif filename.find("RD") >= 0:
                    path = f'./analyzed/rank/RD/{filename}'
                    if os.path.exists(path):
                        rd(path, date)
                elif filename.find("RH") >= 0:
                    path = f'./analyzed/rank/RH/{filename}'
                    if os.path.exists(path):
                        rh(path, date_time)
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
        print("stop")
        for o in observers:
            o.unschedule_all()
            o.stop()
    for o in observers:
        o.join()
