![peaK_](/uploads/828d78b52cd64b9c71264d7e39418df4/peaK_.png)

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

![아키텍쳐](/uploads/2cac473e2c8babb83606b47e30546486/architecture.png)

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

## :family: 프로젝트 멤버

| Name   | Position                                                  |
| ------ | --------------------------------------------------------- |
| 김규리 | `front-end` 랭킹 차트, 로그인, 인트로 페이지                             |
| 박귀렬 | `back-end` 데이터 수집 및 정제, 뉴스 API, 데이터베이스 설계 및 구현  |
| 박시현 | `front-end` 종합 아이돌 페이지, 랭킹 페이지                        |
| 박주희 | `back-end` CI/CD, 회원 API, 관심 아이돌 API, YouTube API          |
| 이한빈 | `front-end` 아이돌 상세 페이지, 마이페이지                         |
| 조현민 | `back-end` 데이터 분석, 개인 데이터 API, 랭킹 API, 데이터베이스 설계|

<br/>

## :clipboard: 포팅 매뉴얼

[Porting_Manual_peaK.pdf](./exec/Porting_Manual_peaK.pdf)
