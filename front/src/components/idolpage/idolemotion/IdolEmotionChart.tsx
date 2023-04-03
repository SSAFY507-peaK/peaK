import ECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';
import { useState } from 'react';

function IdolEmotionChart() {
  let labels = ['월', '화', '수', '목', '금', '토', '일']

  const [options, setOptions] = useState({
    color: ['rgba(230, 35, 77, 0.5)', 'rgba(57, 17, 232, 0.5)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['긍정', '부정']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
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
        min: 0,
        max: 100,
      }
    ],
    series: [
      {
        name: '긍정',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
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
      {
        name: '부정',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.4,
        },
        emphasis: {
          focus: 'series'
        },
        data: labels.map(() => faker.datatype.float({ min: 0, max: 100 }))
      },
    ]
	});	

	return (
    <ECharts
			option={options}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: 'svg'}}
    />
  );
}
export default IdolEmotionChart;

