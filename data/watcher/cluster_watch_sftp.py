from importlib.metadata import files
import os
import time
import datetime
import threading
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import subprocess
import pysftp
import glob
from functools import wraps

hostname="j8a507.p.ssafy.io"
username="ubuntu"
pem_path= "pem_puttygen"
target_directory_path = "watcher/analyzed"

# 클러스터에서 API 서버로 분석결과 보내기
def sftptransfer(src_path):
    cnopts = pysftp.CnOpts()
    cnopts.hostkeys = None  
    filename = os.path.basename(src_path)
    split_filename = filename.split("_")
    date = split_filename[0]
    hour = split_filename[1]
    
    with pysftp.Connection(hostname, username=username, private_key=pem_path, cnopts=cnopts) as sftp:
        if filename.find("PN") >= 0:  
            sftp.put(src_path, f'watcher/analyzed/twitter/PN/{date}_{hour}_PN.txt')
        elif filename.find("TK") >= 0:
            sftp.put(src_path, f'watcher/analyzed/news/TK/{date}_{hour}_TK.txt')
        elif filename.find("NK") >= 0:
            sftp.put(src_path, f'watcher/analyzed/news/NK/{date}_{hour}_NK.txt')   
        elif filename.find("RH") >= 0:
            sftp.put(src_path, f'watcher/analyzed/rank/RH/{date}_{hour}_RH.txt')
        elif filename.find("RD") >= 0:   
            sftp.put(src_path, f'watcher/analyzed/rank/RD/{date}_RD.txt')
        elif filename.find("PD") >= 0:
            sftp.put(src_path, f'watcher/analyzed/twitter/PD/{date}_PD.txt')
        print(f'Successfully sent {filename}!!')     
        sftp.close()


def debounce(delay):
    """
    Decorator that will delay a function's execution until after delay seconds
    have elapsed since the last time it was called.
    """
    def decorator(func):
        @wraps(func)
        def debounced(*args, **kwargs):
            with decorator.lock:
                # Keep track of the time when the function was last called
                last_call_time = getattr(func, 'last_call_time', None)
                current_time = time.time()
                # If the function has never been called or the delay has passed since
                # the last call, execute the function
                if last_call_time is None or (current_time - last_call_time) > delay:
                    func.last_call_time = current_time
                    dt = datetime.datetime.fromtimestamp(func.last_call_time)
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
        date = split_filename[0]
        hour = split_filename[1]    

        if self.type == "input" :
            path = event.src_path
            if path != self.last_created and event.src_path.find('~') == -1:
                self.last_created = path
                # Read the Bash script file
                print(f'{filename} cralwed!')

                if filename.find("TC") >= 0 :
                    with open('twitter_submit.sh', 'r') as f:
                        bash_script = f.read()              
                    bash_script = f"{bash_script} \ {date} \ {hour}"     
                    subprocess.run(['bash','-c', bash_script])        
                elif filename.find("NC") >= 0:
                    with open('news_submit.sh', 'r') as f:
                        bash_script = f.read()
                    bash_script = f"{bash_script} \ {date} \ {hour}"
                    subprocess.run(['bash', '-c', bash_script])                    
        else:
            if event.src_path.find("sync") >=0:
                folder_path = "watcher/analyzed/sync"
                pattern = f"${date}_{hour}*.txt"
                files = glob.glob(folder_path+ '/' + pattern)
                count = len(files)

                if count == 2:
                    with open('date_analyze.sh', 'r') as f:
                        bash_script = f.read()
                    bash_script = f"{bash_script} \ {date}"
                    subprocess.run(['bash', '-c', bash_script])
                    count = 0
                    
            else:
                sftptransfer(event.src_path)

if __name__ == "__main__":
    print('Starting watcher application...')

    # Define the folder to watch for changes
    input_directory_path = 'crawled'
    output_directory_path = 'analyzed'
    observers = []

    # Create an observer to watch for changes in the folder
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
        # Poll every second
        time.sleep(1)
except KeyboardInterrupt:
    for o in observers:
        o.unschedule_all()
        # Stop observer if interrupted
        o.stop()
for o in observers:
    # Wait until the thread terminates before exit
    o.join()