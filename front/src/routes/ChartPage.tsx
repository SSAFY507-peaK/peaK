import RankChart from "../components/rankingpage/RankChart";
import styled from "styled-components";
import ContentDiv from "../components/Content";
import Search from "../components/Search";
import {
  EmptySelected,
  IdolGrid,
  IdolImage,
  IdolImageWrapper,
  IdolName, IdolWrapper,
  Selected
} from "../components/SignupPage/IdolComponents";
import React, {useCallback, useState} from "react";
import {CloseButton} from "../components/Button";

// 나중에 진짜 input값 들어오면 변경 예정..
type IdolObjectType = {
  idolNum?: number;
  idolName?: string;
  idolImg?: string;
  isSelected?: boolean;
  idolData?: number[];
}
type ChartIdolObjectType = {
  name?: string;
  data?: number[];
  type: string;
  lineStyle: {width: number};
}

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  height: 90%;
`
const ChartDiv = styled(ContentDiv)`
  justify-content: center;
  align-items: center;
  //width: 100%;
  flex: 1;
  //height: 35vw;
`;

const IdolSelectDiv = styled(ContentDiv)`
  flex: 1;
`



function ChartPage() {
  let dummyData: IdolObjectType[] = [
    {
      idolNum: 1,
      idolName: "아이돌",
      idolImg: "https://t1.daumcdn.net/cfile/tistory/997F47475F1264272E",
      idolData: [62, 11, 11, 11, 10, 3, 1],
    },
    {
      idolNum: 2,
      idolName: "아이돌2",
      idolImg:
        "http://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1365/hot1665021884875.jpg",
      idolData: [32, 42, 11, 2, 6, 3, 37],
    },
    {
      idolNum: 3,
      idolName: "아이돌3",
      idolImg: "http://image.dongascience.com/Photo/2019/12/31e3797aedc8219a0faebb9b4a1fa72f.jpg",
      idolData: [8, 1, 11, 47, 32, 17, 18],
    },
    {
      idolNum: 4,
      idolName: "아이돌4",
      idolImg: "https://cdn.crowdpic.net/detail-thumb/thumb_d_8750791E71E5BCEA161DE5B15A40AC39.jpg",
      idolData: [11, 25, 22, 11, 45, 2, 1],
    },
    {
      idolNum: 5,
      idolName: "아이돌5",
      idolImg:
        "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/yDv/image/xCjI3YKJtlp6C7kj4fn1PYv0lpY.jpg",
      idolData: [33, 22, 11, 45, 32, 11, 22],
    },
    {
      idolNum: 6,
      idolName: "아이돌6",
      idolImg: "https://cdn.pixabay.com/photo/2018/10/04/20/04/the-stones-3724310__480.jpg",
      idolData: [2, 7, 22, 23, 12, 66, 32],
    },
    {
      idolNum: 7,
      idolName: "아이돌7",
      idolImg:
        "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/2736722884/B.png?997000000",
      idolData: [23, 12, 66, 32, 12, 1, 2],
    },
    {
      idolNum: 8,
      idolName: "아이돌8",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",

    },
    {
      idolNum: 9,
      idolName: "아이돌9",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
      idolData: [12, 66, 32, 1, 2, 23, 2],
    },
    {
      idolNum: 10,
      idolName: "아이돌10",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
      idolData: [33, 12, 56, 45, 25, 11, 2],
    },
    {
      idolNum: 11,
      idolName: "아이돌11",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
      idolData: [11, 23, 45, 82, 11, 1, 2],
    },
    {
      idolNum: 12,
      idolName: "아이돌12",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
      idolData: [25, 11, 23, 3, 12, 56, 45],
    },
  ];  // 더미데이터
  const [selectedIdols, setSelectedIdols] = useState<IdolObjectType[]>([]);
  const [selectedLegends, setSelectedLegends] = useState<string[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartIdolObjectType[]>([]);
  const [idols, setIdols] = useState<IdolObjectType[]>(dummyData);



  /** 내가 선택한 아이돌 팀을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={idol.idolImg} height="90px" >
        <CloseButton onClick={()=>handleDeleteSelectedIdol(idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<EmptySelected height="90px"/>)
    }
    return returnArr;
  }, [selectedIdols]);
  const handleSelectIdol = (idol: IdolObjectType): void => {
    if (idol.isSelected) { return }
    else if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return
    }
    else {
      setIdols(prev => prev.map(idol2 => idol.idolNum === idol2.idolNum? {...idol2, isSelected: true} : idol2))
      setSelectedIdols(prev=> [...prev, {...idol, isSelected: true}]);
      setSelectedLegends(prev => [...prev, idol.idolName]);
      setSelectedChart(prev => [...prev, {name: idol.idolName, type: "line", data: idol.idolData, lineStyle: { width: 3} }])
    }
  }
  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = (idol:IdolObjectType): void => {
    // 원본 배열에서 false로 변경하고... 선택된 배열에서도 삭제를 하자궁...
    setIdols(prev => prev.map(idol2 => idol.idolNum === idol2.idolNum? {...idol2, isSelected: false} : idol2))
    setSelectedIdols(prev=> prev.filter(idol2 => idol.idolNum !== idol2.idolNum));
    setSelectedLegends(prev => prev.filter(idol2 => idol2 !== idol.idolName));
    setSelectedChart(prev => prev.filter(idol2 => idol2.name !== idol.idolName))
  }


  return (
    <ChartWrapper>
      <ChartDiv>
        <RankChart idolLegend={selectedLegends} chartIdol={selectedChart} />
      </ChartDiv>
      <IdolSelectDiv>
        <Search />
        <IdolGrid cols={5}>{ showSelectIdols() }</IdolGrid>
        <IdolWrapper>
          <IdolGrid cols={4} gap="10px">
            {idols.map((idol: IdolObjectType) => (
              <IdolImageWrapper >
                <IdolImage height="100px" url={idol.idolImg} onClick={()=> idol.isSelected? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)} className={`${idol.isSelected && "selected"}`}/>
                <IdolName>{idol.idolName}</IdolName>
              </IdolImageWrapper>
            ))}
          </IdolGrid>
        </IdolWrapper>
      </IdolSelectDiv>
    </ChartWrapper>
  );
}

export default ChartPage;
