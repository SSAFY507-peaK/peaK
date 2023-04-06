import { PosNeg, WeeklyRankingType } from '../../../_utils/Types';
import { useEffect, useState } from "react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ClickTracker } from '../../../_utils/UserTracker';
import IdolEmotionChart from "./IdolEmotionChart";
import IdolEmotionChartBtn from "./IdolEmotionChartBtn";
import IdolEmotionRankChart from "./IdolEmotionRankChart";
import { request } from '../../../_utils/axios';
import styled from "styled-components";
import { useParams } from 'react-router';

const DataFrame = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom: 25px;
`;

const ChartBtnFrame = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  flex: 0.3;
  height: 30vh;
`;

const ChartFrame = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 20px 60px 20px 60px;
  flex: 0.7;
  height: 30vh;
  border-radius: 20px;
`;
const tmp:PosNeg[] = [
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },
  {
    pos:80,
    neg:20
  },    
]

const tmp2:WeeklyRankingType = {
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
    {
			rank: 41,
			score: 13000
		},
		{
			rank: 5,
			score: 13000
		},
		{
			rank: 44,
			score: 13000
		},
    {
			rank: 4,
			score: 13000
		},
	]
}

function IdolEmotion() {
  const [check, setCheck] = useState<boolean>(true);
  const params = useParams();
  const idolName:string = params.idolName || "";

  const [rankData, setRankData] = useState<WeeklyRankingType>(tmp2)
  const [posNegWeek, setPosNegWeek] = useState<PosNeg[]>(tmp)

  useEffect(() => {
    async function Loader() {
      await request("get", `/peak/weekly/${idolName}`).then( res => rankData ? null : setRankData(res))
      await request("get", `/idol/${idolName}/pos-neg`).then( res => posNegWeek ? null : setPosNegWeek(res.posNegWeek))
    }
    Loader();

  }, [])


  const [rankWeek, setRankWeek] = useState<number[]>([0]);
  useEffect(() => {
    let tmp:number[] =[]
    for (let i = 0; i < rankData.rankWeek.length; i++) {
      tmp = [...tmp, rankData.rankWeek[i].rank]
    }
    setRankWeek(tmp)
  },[rankData])

  return(
    <DataFrame>
      <ChartBtnFrame>
        <IdolEmotionChartBtn
          isTab = {check}
          ranknum= {`${rankData.current.rank}위`}
          rankicon={<ArrowDropUpIcon sx={{ color: "red"}} />}
          color="red"
          changenum={3} 
          title="종합랭킹" 
          onClick={() => {
            ClickTracker(idolName)
            return (
              !check ? setCheck(true) : null
            )
          }} />
        <IdolEmotionChartBtn 
          isTab = {!check} 
          ranknum={`${posNegWeek[0].pos}점`}
          rankicon={<ArrowDropUpIcon  sx={{ color: "red"}} />}
          color="red"
          changenum={3} 
          title="긍정지수" 
          onClick={() => {
            ClickTracker(idolName)
            return (
              check? setCheck(false) : null
            )
          }}/>
      </ChartBtnFrame>
      <ChartFrame>
        {
          check 
          ?
          <IdolEmotionRankChart rankWeek={rankWeek} />
          :
          <IdolEmotionChart posNegWeek={posNegWeek} />
        }
      </ChartFrame>
    </DataFrame>
  )
}
      
export default IdolEmotion;
