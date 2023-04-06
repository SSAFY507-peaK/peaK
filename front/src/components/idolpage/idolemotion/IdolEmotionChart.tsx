import ECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { PosNeg } from '../../../_utils/Types';

interface Props {
  posNegWeek: PosNeg[];
}

function IdolEmotionChart({posNegWeek}:Props) {
  let labels = ['월', '화', '수', '목', '금', '토', '일']
  const [posList, setPosList] = useState<number[]>([0])
  const [negList, setNegList] = useState<number[]>([0])
  useEffect(() => {
    let posTmp:number[] = []
    let negTmp:number[] = []
    if ( posNegWeek ) {
      for ( let i=0; i < posNegWeek.length; i++) {
        posTmp.push(posNegWeek[i].pos)
        negTmp.push(posNegWeek[i].neg)
      }
      setPosList(posTmp)
      setNegList(negTmp)
    }
  }, [])
  
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
        // data: posList
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
        // data: negList
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

