export type Idoldata = {
  myTotaldata: number;
  dataLst: Array<number>;
  dataAvg: Array<number>;
};

export type RankListType = {
  idol: string;
  rank: number;
  score: number;
  diff: number;
};

export type IdolListsType = {
  idols: string[];
};

export type TrendNewsListType = {
  link: string;
  press: string;
  summary: string;
  thumbnailLink: string;
  title: string;
};

// export type MyIdolDetail = {
//   name: string;
//   myScore: number;
//   averageScore: number;
//   comments: Object<CommentList>;
// }

// export type CommentList = {
//  comments: Array<Comments>;
// }

// export type Comments = {
//   content: string;
//   datetime: string;
// }

// type GetData = {
//   // id: number;
//   data: number;
// }

export interface IdolInterest {
  idols: MyIdolDetail[];
}

export interface MyIdolDetail {
  idol: string;
  value: number;
  interestScore: number;
  interestAverage: number;
  comments: Array<Comment> | boolean[];
}

export interface Comment {
  nickname?: string;
  content: string;
  datetime: string;
}

export interface IdolSns {
  idol: string;
  snsLink: SnsLink;
  interest: boolean;
}

export interface SnsLink {
  instagram: string;
  youtube: string;
  twitter: string;
}

/** 디테일 페이지 아이돌 채팅목록 타입*/ 
export interface Comments {
  comments: Comment[];
}