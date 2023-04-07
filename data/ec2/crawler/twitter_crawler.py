import datetime as dt
import json
import os
import twint
import shutil


async def crawling(idols, cur_dt):
    print(f"{cur_dt} => twitter crawling start")

    path = "."
    result_filename = \
        f'{str(cur_dt.year)[-2:]}{cur_dt.month:02d}{cur_dt.day:02d}_{cur_dt.hour:02d}_T.txt'

    if result_filename not in os.listdir(path):
        with open(f'{result_filename}', "w") as f:
            f.write('[')

    prev_dt = cur_dt - dt.timedelta(minutes=15)

    c = twint.Config()
    c.Since = (cur_dt - dt.timedelta(days=1)).strftime("%Y-%m-%d")
    c.Limit = 12
    c.Lang = "ko"
    c.Min_likes = 1
    c.Hide_output = True
    c.Popular_tweets = True
    c.Store_json = True
    c.Output = 'twitter_crawling.json'
    c.Custom["tweet"] = ["date", "time", "tweet", "retweets_count", "likes_count"]

    with open(c.Output, "w", encoding="utf-8"):
        pass

    twit_list = []
    for idol in idols:
        cnt = 0
        for notation in idol['notations']:
            c.Search = notation
            twint.run.Search(c)
            with open(c.Output, "r+", encoding="utf-8") as f:
                for json_txt in f:
                    json_obj = json.loads(json_txt)
                    date = json_obj['date']
                    time = json_obj["time"]
                    reg_dt = \
                        dt.datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M:%S") \
                        + dt.timedelta(hours=9)
                    if prev_dt > reg_dt or reg_dt >= cur_dt:
                        break
                    json_obj['idol'] = idol['idol']
                    json_obj.pop('date')
                    json_obj.pop('time')
                    cnt += 1
                    twit_list.append(json.dumps(json_obj, ensure_ascii=False))
                f.truncate(0)
        name = idol['idol']
        print(f"{name}: {cnt}개")

    if twit_list:
        with open(f'{result_filename}', 'a', encoding='utf-8') as f:
            twit_cnt = len(twit_list)
            print(f'{cur_dt}: twitter {twit_cnt}개 추가')
            if os.stat(f'{result_filename}').st_size > 1:
                f.write(',')
            f.write(f"{','.join(twit_list)}")

    if cur_dt.minute == 45:
        try:
            with open(f'{result_filename}', 'a', encoding='utf-8') as f:
                f.write(']')
            os.rename(result_filename, f'{result_filename[:-4]}C.txt')
            result_filename = f'{result_filename[:-4]}C.txt'
            shutil.move(f'{result_filename}', f'../watcher/crawled/twitter/{result_filename}')
            print(f"트위터 크롤링 결과(1시간) 파일 이름 변경 성공: {result_filename}")
        except Exception as e:
            print(f"트위터 크롤링 결과(1시간) 파일 이름 변경 실패: {e}")
    print(f'{cur_dt}: 트위터 크롤링 종료')

