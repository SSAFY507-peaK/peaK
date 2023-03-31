import ECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';
import { useState } from 'react';

function IdolEmotionRankChart() {
  let labels = ['월', '화', '수', '목', '금', '토', '일']
  const idolName = "세븐틴"
  const [options, setOptions] = useState({
    color: "#fff",
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        // label: {
        //   backgroundColor: '#6a7985'
        // }
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
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        inverse: true
        // splitLine: {
        //   show: false // 가로선 숨기기
        // }
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
        data: labels.map(() => faker.datatype.float({ min: 0, max: 100 }))
      },
    ]
  })

  return (
    <ECharts
			option={options}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: 'svg'}}
      />
  );
}

export default IdolEmotionRankChart;