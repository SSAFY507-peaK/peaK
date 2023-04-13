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
        if filename.find("TK") >= 0:
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
        print(f"{event.src_path} created!")
        if self.type == "input" :
            date = split_filename[0]
            hour = split_filename[1]   
            path = event.src_path
            if path != self.last_created and event.src_path.find('~') == -1:
                self.last_created = path
                # Read the Bash script file
                print(f'{filename} cralwed!')

                if filename.find("TC") >= 0 :
                    folder_path = "watcher/analyzed/sync"
                    pattern = f"${date}_{hour}*.txt"
                    files = glob.glob(folder_path+ '/' + pattern)
                    count = len(files)
                    while count == 0 :
                      print("Twitter waiting for news")
                      time.sleep(10)
                      files = glob.glob(folder_path+ '/' + pattern)
                      count = len(files)
                    with open('twitter_submit.sh', 'r') as f:
                        bash_script = f.read()              
                    bash_script = f"{bash_script} \{date} \{hour}"     
                    subprocess.run(['bash','-c', bash_script])        
                elif filename.find("NC") >= 0:
                    with open('news_submit.sh', 'r') as f:
                        bash_script = f.read()
                    bash_script = f"{bash_script} \{date} \{hour}"
                    subprocess.run(['bash', '-c', bash_script])                    
        else:
            if event.src_path.find("sync") >=0:
                date = split_filename[0]
                hour = split_filename[1] 
                folder_path = "watcher/analyzed/sync"
                pattern = f"${date}_{hour}*.txt"
                files = glob.glob(folder_path+ '/' + pattern)
                count = len(files)
                #print(count)
                if count == 2:
                  with open('rank_hour_submit.sh', 'r') as f:
                      bash_script = f.read()
                  bash_script = f"{bash_script} \{date} \{hour}"
                  subprocess.run(['bash', '-c', bash_script])
                  count = 0
                    
            else:
                
                if event.src_path.find("start.txt") >= 0:
                    date = split_filename[0] 
                    print(date)
                    with open('date_analyze_submit.sh', 'r') as f:
                        bash_script = f.read() 
                    bash_script = f"{bash_script} \{date}"
                    print(bash_script)
                    subprocess.run(['bash', '-c', bash_script])
                sftptransfer(event.src_path)



def run_TC_observer():
    TC_path = "crawled/twitter"
    TC_event_handler = TestEventHandler(patterns=["*_TC.txt"], type="input")
    TC_observer = Observer()
    TC_observer.schedule(TC_event_handler, TC_path, recursive=True)
    observers.append(TC_observer)
    TC_observer.start()

def run_NC_observer():
    NC_path = "crawled/news"
    NC_event_handler = TestEventHandler(patterns=["*_NC.txt"], type="input")
    NC_observer = Observer()
    NC_observer.schedule(NC_event_handler, NC_path, recursive=True)
    observers.append(NC_observer)
    NC_observer.start()

def run_OUTPUT_observer():
    output_directory_path = 'analyzed'
    output_event_handler = TestEventHandler(patterns=["*.txt"], type="output")
    output_observer = Observer()
    output_observer.schedule(output_event_handler, output_directory_path, recursive=True)
    observers.append(output_observer)
    output_observer.start()

if __name__ == "__main__":
    print('Starting watcher application...')
    observers = []
    # Run the TC observer in a separate thread
    TC_thread = threading.Thread(target=run_TC_observer)
    TC_thread.start()

    NC_thread = threading.Thread(target=run_NC_observer)
    NC_thread.start()

    OUTPUT_thread = threading.Thread(target=run_OUTPUT_observer)
    OUTPUT_thread.start()    

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