import { useEffect, useState } from 'react';

import ECharts from 'echarts-for-react';
import { WeeklyRankingType } from '../../../_utils/Types';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router';

interface Props {
  rankData: WeeklyRankingType;
}


function IdolEmotionRankChart({rankData}:Props) {
  let labels = ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', '오늘']
  const params = useParams();
  const idolName:string = params.idolName || "";

  // const [rankWeek, setRankWeek] = useState<number[]>([0]);
  const [rankWeek, setRankWeek] = useState<number[]>(labels.map(() => faker.datatype.float({ min: 0, max: 100 })));
  // useEffect(() => {
  //   let tmp:number[] =[]
  //   if (rankData) {
  //     for (let i = 0; i < rankData.rankWeek.length; i++) {
  //       tmp = [...tmp, rankData.rankWeek[i].rank]
  //     }
  //     setRankWeek(tmp)
  //   }
  // },[rankData])

  const options = {
    color: "white",
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      }
    },
    legend: {
      // data: idolName,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,
      containLabel: true,
      backgroundColor: "#F946FF",
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: labels
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 1,
        min: 100,
        interval: 20,
        inverse: true,
        splitLine: {
          show: true // 가로선 숨기기
        }
      }
    ],
    series: [
      {
        name: idolName,
        type: 'line',
        // stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: 'series'
        },
        data: rankWeek
      },
    ]
  }

  return (
    <ECharts
			option={options}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: 'svg'}}
      />
  );
}

export default IdolEmotionRankChart;