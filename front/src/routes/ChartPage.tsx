import React, { useCallback, useState } from "react";
import {useLoaderData} from "react-router-dom";
// import axios from "axios";
import styled from "styled-components";

import { IdolListsType } from "../_utils/Types";
import {
  IdolSection,
  IdolGrid,
  NotSelected,
  Selected,
} from "../components/SignUpPage/IdolComponents";
import { CloseButton } from "../components/Button";
import ContentDiv from "../components/Content";
import RankChart from "../components/RankingPage/RankChart";
import Search from "../components/Search";
import IdolImgNameContainer from "../components/IdolImgNameContainer";

const BASE_URL = process.env.REACT_APP_BASE_URL;
type ChartIdolObjectType = {
  name?: string;
  data?: number[];
  type: string;
  lineStyle: { width: number };
};

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  height: 90%;
`;
const ChartDiv = styled(ContentDiv)`
  justify-content: center;
  align-items: center;
  //width: 100%;
  flex: 1;
  //height: 35vw;
`;

const IdolSelectDiv = styled(ContentDiv)`
  flex: 1;
`;

function ChartPage() {
  const idolLists = useLoaderData() as IdolListsType;
  const [selectedIdols, setSelectedIdols] = useState<string[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartIdolObjectType[]>([]);

  /** 좋아하는 아이돌을 선택하자 */
  const handleSelectIdol = useCallback((idol: string): void => {
    if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return;
    }
    else {
      const responseData = {
        current: {
          rank: 1,
          score: 13000
        },
        rankWeek: [
          {
            rank: 1,
              score: 13000
          },
          {
            rank: 5,
              score: 13000
          },
          {
            rank: 4,
              score: 13000
          },
        ]
      }
      const weeklyRanking = [...responseData.rankWeek.map(rank => rank.rank), responseData.current.rank];
      setSelectedIdols(prev => [...prev, idol]);
      setSelectedChart(prev => [
        ...prev,
        { name: idol, type: "line", data: weeklyRanking, lineStyle: { width: 3 } },
      ]);

      // 이렇게 요청 보내야하지 않을까
      // axios.get(`${BASE_URL}/api/peak/weekly/${idol}`)
      //   .then(response => {
      //     const responseData = response.data;
      //     console.log(responseData);
      //     const weeklyRanking = [...responseData.rankWeek.map(rank => rank.rank), responseData.current.rank];
      //     setSelectedIdols(prev => [...prev, idol]);
      //     setSelectedChart(prev => [
      //       ...prev,
      //       { name: idol, type: "line", data: weeklyRanking, lineStyle: { width: 3 } },
      //     ]);
      //   })
      //   .catch(error => console.log(error))
    }
  }, [selectedIdols]);
  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = useCallback((idol: string): void => {
    // 선택된 배열에서 삭제를 하자궁...
    setSelectedIdols(prev=> prev.filter(selectedIdol => selectedIdol !== idol));
    setSelectedChart(prev => prev.filter(selectedIdol => selectedIdol.name !== idol));
  }, []);
  /** 선택된 아이돌을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={`${BASE_URL}/img/${encodeURIComponent(idol)}.webp`} width="100px" >
        <CloseButton onClick={()=>handleDeleteSelectedIdol(idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<NotSelected width="100px" />)
    }
    return returnArr;
  }, [selectedIdols, handleDeleteSelectedIdol]);


  return (
    <ChartWrapper>
      <ChartDiv>
        <RankChart selectedIdols={selectedIdols} selectedChart={selectedChart}  />
      </ChartDiv>
      <IdolSelectDiv>
        <Search />
        <IdolGrid cols={5}>{showSelectIdols()}</IdolGrid>
        <IdolSection>
          <IdolGrid cols={4} gap="20px">
            {idolLists.idols.map((idol: string) =>
              <IdolImgNameContainer
                url={`${BASE_URL}/img/${encodeURIComponent(`${idol}`)}.webp`}
                width="100%"
                idol={ idol }
                onClick={()=> selectedIdols.includes(idol) ? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)}
                className={`${selectedIdols.includes(idol) && "selected"}`}
              />
            )}
          </IdolGrid>
        </IdolSection>
      </IdolSelectDiv>
    </ChartWrapper>
  );
}

export default ChartPage;
