import ECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router';
import { useState } from 'react';

interface Props {
  rankWeek: number[];
}


function IdolEmotionRankChart({rankWeek}:Props) {
  let labels = ['월', '화', '수', '목', '금', '토', '일']
  const params = useParams();
  const idolName:string = params.idolName || "";

  const options = {
    color: "#F946FF",
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
      backgroundColor: "white",
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
          show: false // 가로선 숨기기
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