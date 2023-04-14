import { useEffect, useState } from 'react';

import ECharts from 'echarts-for-react';
import { PosNeg } from '../../../_utils/Types';

interface Props {
  posNeg: PosNeg[];
}

function IdolEmotionChart({posNeg}:Props) {
  let labels = ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', '오늘']

  const [posList, setPosList] = useState<number[]>()
  const [negList, setNegList] = useState<number[]>()
  useEffect(() => {
    let posTmp:number[] = []
    let negTmp:number[] = []
    if ( posNeg ) {
      for ( let i=0; i < posNeg.length; i++) {
        posTmp.push(posNeg[i].pos)
        negTmp.push(posNeg[i].neg)
      }
      setPosList(posTmp)
      setNegList(negTmp)
    }
  }, [posNeg])
  
  const options = {
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
        data: posList
      },
      {
        name: '부정',
        type: 'line',
        // stack: 'Total',
        smooth: true,
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
        data: negList
      },
    ]
	};	

	return (
    <ECharts
			option={options}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: 'svg'}}
    />
  );
}
export default IdolEmotionChart;

