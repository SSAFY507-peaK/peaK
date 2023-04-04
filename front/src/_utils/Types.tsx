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
}

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
