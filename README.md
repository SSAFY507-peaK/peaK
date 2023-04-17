![peaK_](https://user-images.githubusercontent.com/106078444/232363265-31d61074-1d5a-4a2a-99a9-7baf41a3b6b2.png)

# peaK - 나만의 아이돌 분석기

---

## :sparkles: 서비스 소개

내가 관심있는 아이돌을 선택하고

아이돌에 대한 peaK만의 랭킹과 차트를 확인해보세요

<br/>

## :pushpin: 주요 기능

**트위터 감성분석**을 통한 나의 아이돌 평판 확인

내가 좋아하는 아이돌의 **핫 키워드 및 인기 뉴스 기사** 확인

peaK만의 기준으로 **아이돌 랭킹** 제공

<br/>

## :date: 프로젝트 진행 기간

2023.02.27.MON ~ 2023.04.07.FRI (6주)

<br/>

## :triangular_ruler: 아키텍처

![architecture](https://user-images.githubusercontent.com/106078444/232363213-35208d6f-acc0-4ffc-88b9-f3202253b2e3.png)

<br/>

## :wrench: 기술스택

### `CI/CD`

AWS EC2 Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-1018-aws x86_64)

Docker 20.10.23

Jenkins 2.375.2

Nginx : 1.23.3

### `Backend`

IntelliJ IDEA : 2022.3.1

JVM : OpenJDK 11

SpringBoot Gradle 2.7.10

Spring Security

Spring Data MongoDB

Swagger

JWT 0.11.5

### `Frontend`

Visual Studio Code 1.77.1

Node.js 16.16.0

TypeScript 4.9.5

React 18.2.0

Redux

Apache ECharts 5.4.2

### `Database`

MongoDB 6.0.5

Redis 7.0.10

<br/>

## :computer: 서비스 화면

### 인트로

- 모든 기능은 회원가입 후 이용 가능하므로 서비스 소개 확인

![peaK_인트로](https://user-images.githubusercontent.com/106078444/232363433-31b151fb-1755-4f0e-a191-548f545eb254.gif)

### 회원가입

- 카카오 로그인 후 닉네임과 관심 아이돌을 설정하면 서비스 회원가입 완료

![peaK_회원가입](https://user-images.githubusercontent.com/106078444/232363464-5cb8809a-fd87-46d4-a16a-99dcbfe2d850.gif)

### 홈

- 아이돌 랭킹 top8과 트렌딩 유튜브, 뉴스를 한 눈에 보기

![peaK_홈](https://user-images.githubusercontent.com/106078444/232363452-d4862811-d582-4261-b9b1-7579b9a4c807.gif)

### 관심아이돌

- 내가 설정한 관심 아이돌의 페이지 목록으로 바로가기

![peaK_관심아이돌](https://user-images.githubusercontent.com/106078444/232363299-5d2e6192-dfb1-48a3-9bac-92514da51cd2.gif)

### 아이돌

- 아이돌 검색
- 아이돌의 순위와 긍부정 지수, 워드 클라우드와 뉴스
- 응원 한 마디 남기기

![peaK_아이돌](https://user-images.githubusercontent.com/106078444/232363412-77a115c3-9c8d-4ec1-85a9-1d1dd7826ac2.gif)

### 랭킹 / 차트

- 한 시간마다 업데이트 되는 랭킹
- 내가 고른 아이돌들의 추이를 차트로 확인

![peaK_랭킹_차트](https://user-images.githubusercontent.com/106078444/232363396-579130c1-9013-447f-a39a-f9a0e3360ccb.gif)

### 트렌딩

- 지금 이 시간, 아이돌에게 어떤 일이 일어나는지 트렌딩 뉴스 모아보기
- 오늘의 트렌딩 유튜브 모아보기

![peaK_트렌딩](https://user-images.githubusercontent.com/106078444/232363442-22cbc7a2-ce92-41c6-9b26-35c5c72e9890.gif)

### 마이페이지

- 내 아이돌에게 얼마나 관심을 쏟았는지 수치로 확인
- 내가 남겼던 2주 간의 응원 한 마디 기록

![peaK_마이페이지](https://user-images.githubusercontent.com/106078444/232363403-9703de2f-ce6a-492d-8ed5-3e359dfe6e96.gif)

<br/>

## :family: 프로젝트 멤버

| Name   | Position                                                             |
| ------ | -------------------------------------------------------------------- |
| 김규리 | `front-end` 랭킹 차트, 로그인, 인트로 페이지                         |
| 박귀렬 | `back-end` 데이터 수집 및 정제, 뉴스 API, 데이터베이스 설계 및 구현  |
| 박시현 | `front-end` 종합 아이돌 페이지, 랭킹 페이지                          |
| 박주희 | `back-end` CI/CD, 회원 API, 관심 아이돌 API, YouTube API             |
| 이한빈 | `front-end` 아이돌 상세 페이지, 마이페이지                           |
| 조현민 | `back-end` 데이터 분석, 개인 데이터 API, 랭킹 API, 데이터베이스 설계 |

<br/>

## :clipboard: 포팅 매뉴얼

[Porting_Manual_peaK.pdf](./exec/Porting_Manual_peaK.pdf)
