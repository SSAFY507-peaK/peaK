from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium import webdriver
import datetime as dt
import json
import os
import requests
import shutil
import time


def write_result_to_file(session, record_dt, result_filename):
    idol_news_list_by_time_post_url = 'http://localhost:8093/news/list/idol'
    all_idol_news_list_by_time_post_url = 'http://localhost:8093/news/list/all-idol'
    try:
        # 1 hour tally finish
        with open(f'{result_filename}', 'a', encoding='utf-8') as f:
            f.write(']')

        # Read data and convert to json
        with open(f'{result_filename}', 'r', encoding='utf-8') as f:
            json_str = f.read()
        mentioned_idols = set(json_data['idol'] for json_data in json.loads(json_str))
        if mentioned_idols:
            response = session.post(
                all_idol_news_list_by_time_post_url,
                data=json.dumps(
                    {
                        "date_time": record_dt,
                        "keyword_counter": {},
                        "news_list": []
                    },
                    ensure_ascii=False
                ).encode('utf-8')
            )
            if response.status_code == 200:
                print(f'{record_dt}: 전체 아이돌 뉴스 리스트 생성 성공')
            else:
                print(f'{record_dt}: 전체 아이돌 뉴스 리스트 생성 실패 {response.content}')

            for mentioned_idol in mentioned_idols:
                response = session.post(
                    idol_news_list_by_time_post_url,
                    data=json.dumps(
                        {
                            "idol": mentioned_idol,
                            "date_time": record_dt,
                            "keyword_counter": {},
                            "news_list": []
                        },
                        ensure_ascii=False
                    ).encode('utf-8')
                )
                if response.status_code == 200:
                    print(f'{mentioned_idol}: 아이돌 뉴스 리스트 생성 성공')
                else:
                    print(f'{mentioned_idol}: 아이돌 뉴스 리스트 생성 실패 {response.content}')

            os.rename(result_filename, f'{result_filename[:-4]}C.txt')
            result_filename = f'{result_filename[:-4]}C.txt'
        else:
            with open(f'{result_filename}', 'r+', encoding='utf-8') as f:
                f.truncate(0)
                f.write('[{"idol": "없음", "index": -1, "title": "없음", "content": "없음", "summary": "없음"}]')

            os.rename(result_filename, f'{result_filename[:-4]}E.txt')
            result_filename = f'{result_filename[:-4]}E.txt'
        shutil.move(
            f'{result_filename}',
            f'../watcher/crawled/news/{result_filename}'
        )
        print(f"뉴스 크롤링 결과(1시간) 파일 이름 변경 성공: {result_filename}")
    except Exception as e:
        os.rename(result_filename, f'{result_filename[:-4]}E.txt')
        result_filename = f'{result_filename[:-4]}E.txt'
        shutil.move(
            f'{result_filename}',
            f'../watcher/crawled/news/{result_filename}'
        )
        print(f"뉴스 크롤링 결과(1시간) 파일 이름 변경 실패: {e}")


async def crawling(idols, cur_dt):
    print(f"{cur_dt} => news crawling start")

    headers = {'Content-type': 'application/json'}
    session = requests.Session()
    session.headers.update(headers)

    empty_page = '기사가 없습니다.'
    news_post_url = 'http://localhost:8093/news'

    path = "."
    result_filename = \
        f'{str(cur_dt.year)[-2:]}{cur_dt.month:02d}{cur_dt.day:02d}_{cur_dt.hour:02d}_N.txt'
    news_index_file = 'news_index.txt'
    last_crawled_url_list_file = 'last_crawled_url_list.txt'

    if result_filename not in os.listdir(path):
        with open(f'{result_filename}', "w") as f:
            f.write('[')
    if news_index_file not in os.listdir(path):
        with open(f'{news_index_file}', 'w') as f:
            f.write('0')

    prev_dt = cur_dt - dt.timedelta(minutes=10)
    record_dt = dt.datetime(cur_dt.year, cur_dt.month, cur_dt.day, cur_dt.hour).isoformat()

    categories_url_list = [
        'https://entertain.naver.com/now?sid=221#sid=221',
        'https://entertain.naver.com/now?sid=224#sid=224',
        'https://entertain.naver.com/now?sid=7a5#sid=7a5'
    ]

    last_crawled_url_list = []
    next_boundary_crawled_url_list = []

    if f'{last_crawled_url_list_file}' not in os.listdir(path):
        with open(f'{last_crawled_url_list_file}', 'w', encoding='utf-8') as f:
            f.write("https://www.naver.com/\n")
            f.write("https://www.naver.com/\n")
            f.write("https://www.naver.com/\n")

    with open(f'{last_crawled_url_list_file}', 'r+', encoding='utf-8') as f:
        for last_crawled_url in f:
            last_crawled_url_list.append(last_crawled_url.rstrip())
        f.truncate(0)

    with open(f'{news_index_file}', 'r', encoding='utf-8') as f:
        index = int(f.readline())

    driver = webdriver.Chrome('./chromedriver')
    time.sleep(10)
    driver.get('https://www.naver.com')
    time.sleep(10)
    driver.execute_script("window.open('');")
    time.sleep(5)

    news_list = []
    date = prev_dt.strftime("%Y-%m-%d")

    for base_url, last_crawled_url in zip(categories_url_list, last_crawled_url_list):
        url_set = set()
        page = 1
        is_end = False
        next_boundary_crawled_url = ''
        while not is_end:
            for _ in range(3):
                try:
                    if is_end:
                        break
                    url = f'{base_url}&date={date}&page={page}'
                    WebDriverWait(driver, 10).until(ec.number_of_windows_to_be(2))
                    driver.switch_to.window(driver.window_handles[0])
                    time.sleep(2)
                    driver.get(url)
                    time.sleep(3)

                    article_title = WebDriverWait(driver, 10).until(
                        ec.presence_of_element_located(
                            (By.CSS_SELECTOR, '#newsWrp > ul > li:first-child')
                        )
                    ).text
                    if article_title == empty_page:
                        is_end = True
                        break
                    article_list = WebDriverWait(driver, 10).until(
                        ec.presence_of_all_elements_located(
                            (By.CSS_SELECTOR, '#newsWrp > ul > li')
                        )
                    )
                    time.sleep(2)

                    for article in article_list:
                        time.sleep(2)
                        text = WebDriverWait(article, 10).until(
                            ec.presence_of_element_located((By.CLASS_NAME, 'tit_area'))
                        )
                        title_and_link = WebDriverWait(text, 10).until(
                            ec.presence_of_element_located((By.CLASS_NAME, 'tit'))
                        )
                        title = title_and_link.text.replace('"', "'")
                        summary = WebDriverWait(text, 10).until(
                            ec.presence_of_element_located((By.CLASS_NAME, 'summary'))
                        ).text.replace('"', "'")
                        link = title_and_link.get_attribute("href")

                        if link == last_crawled_url:
                            is_end = True
                            break
                        if link in url_set:
                            continue

                        press = WebDriverWait(text, 10).until(
                            ec.presence_of_element_located(
                                (By.CLASS_NAME, 'press')
                            )
                        ).text.split()[0].replace('"', "'")

                        idol_list = []
                        for idol in idols:
                            for notation in idol['notations']:
                                if notation in title or notation in summary:
                                    idol_list.append(idol['idol'])
                                    break

                        if idol_list:
                            WebDriverWait(driver, 10).until(ec.number_of_windows_to_be(2))
                            driver.switch_to.window(driver.window_handles[1])
                            time.sleep(2)
                            driver.get(link)
                            time.sleep(3)
                            art_input_info = WebDriverWait(driver, 10).until(
                                ec.presence_of_element_located((By.CLASS_NAME, 'author'))
                            )
                            art_input_info = WebDriverWait(art_input_info, 10).until(
                                ec.presence_of_element_located((By.TAG_NAME, 'em'))
                            ).text
                            art_input_date, is_midday, art_input_time = art_input_info.split()
                            hour, minute = map(int, art_input_time.split(":"))
                            art_input_time = dt.datetime(
                                int(art_input_date[:4]),
                                int(art_input_date[5:7]),
                                int(art_input_date[8:10]),
                                hour,
                                minute
                            )

                            if is_midday == "오후" and hour < 12:
                                art_input_time += dt.timedelta(hours=12)
                            if prev_dt > art_input_time:
                                is_end = True
                                break
                            if art_input_time >= cur_dt:
                                continue

                            if page == 1 and next_boundary_crawled_url == '':
                                next_boundary_crawled_url = link

                            try:
                                thumbnail_link = WebDriverWait(driver, 10).until(
                                    ec.presence_of_element_located((By.ID, "img1"))
                                ).get_attribute('src')
                            except:
                                thumbnail_link = ''
                            content = WebDriverWait(driver, 10).until(
                                ec.presence_of_element_located((By.ID, 'articeBody'))
                            ).text.replace('\n', ' ').replace('"', "'")

                            url_set.add(link)

                            for idol in idol_list:
                                data = {
                                    "idol": idol,
                                    "index": index,
                                    "date_time": record_dt,
                                    "press": press,
                                    "title": title,
                                    "word_counter": {},
                                    "summary": summary,
                                    "link": link,
                                    "thumbnail_link": thumbnail_link
                                }
                                response = session.post(
                                    news_post_url,
                                    data=json.dumps(data, ensure_ascii=False).encode('utf-8')
                                )
                                if response.status_code == 200:
                                    news_list.append(
                                        f'{{'
                                        f'"idol": "{idol}",'
                                        f'"index": {index},'
                                        f'"title": "{title}",'
                                        f'"content": "{content}",'
                                        f'"summary": "{summary}"'
                                        f'}}'
                                    )
                                index += 1
                            WebDriverWait(driver, 10).until(ec.number_of_windows_to_be(2))
                            driver.switch_to.window(driver.window_handles[0])
                            time.sleep(2)
                    break
                except Exception as e:
                    print(f"retry by page reloading: {e}")
                    time.sleep(7)
                    continue
            page += 1
        next_boundary_crawled_url_list.append(next_boundary_crawled_url)
    driver.quit()

    with open(f'{last_crawled_url_list_file}', 'a', encoding='utf-8') as f:
        url_cnt = 0
        if next_boundary_crawled_url_list:
            for next_boundary_crawled_url in next_boundary_crawled_url_list:
                f.write(f'{next_boundary_crawled_url}\n')
                url_cnt += 1
        for _ in range(len(categories_url_list) - url_cnt):
            f.write("https://www.naver.com/\n")

    with open(f'{news_index_file}', 'w', encoding='utf-8') as f:
        f.truncate(0)
        f.write(f'{index}')
    if news_list:
        news_cnt = len(news_list)
        print(f'{news_cnt}개 뉴스 추가')
        with open(f'{result_filename}', 'a', encoding='utf-8') as f:
            news_cnt = len(news_list)
            print(f'{cur_dt}: news {news_cnt}개 추가')
            if os.stat(f'{result_filename}').st_size > 1:
                f.write(',')
            f.write(f"{','.join(news_list)}")

    if cur_dt.minute == 50:
        write_result_to_file(session, record_dt, result_filename)
    print(f'{cur_dt}: 뉴스 크롤링 종료')
