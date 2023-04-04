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
  interestAverage: number;
  comments: CommentList[];
}

export interface CommentList {
  content: string;
}