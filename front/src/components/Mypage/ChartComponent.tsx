import { Idoldata } from '../../_utils/Types';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';

interface Props {
  idoldata: Idoldata;
  name: string;
}

const Frame = styled.div`
  height: 26.5vh;  
`;

function ChartComponent({idoldata, name}:Props) {
  const option = {
    color: ["#4CD7F6", "#C74BF6"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        magicType: { show: false, type: ['line', 'bar'] },
      }
    },

    xAxis: [
      {
        type: 'category',
        data: ['월', '화', '수', '목', '금', '토', '일'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        interval: 50,
      },
      {
        type: 'value',
        // name: 'Temperature',
        min: 0,
        // max: 25,
        interval: 5,
        // axisLabel: {
        //   formatter: '{value} °C'
        // }
      }
    ],
    series: [
      {
        name: `나의 ${name}`,
        type: 'bar',
        // tooltip: {
        //   valueFormatter: function (value:number) {
        //     return (value as number) + ' ml';
        //   }
        // },
        data: idoldata.dataLst
      },
      {
        name: `평균 ${name}`,
        type: 'bar',
        // tooltip: {
        //   valueFormatter: function (value:number) {
        //     return (value as number) + ' ml';
        //   }
        // },
        data: idoldata.dataAvg
      },
      // {
      //   name: 'Temperature',
      //   type: 'line',
      //   yAxisIndex: 1,
      //   // tooltip: {
      //   //   valueFormatter: function (value:number) {
      //   //     return (value as number) + ' °C';
      //   //   }
      //   // },
      //   data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      // }
    ]
  };
  return (
    <Frame>
      <ReactEcharts 
        option={option}
        style={{ height: "100%", width: "100%" }}
      />
    </Frame>
  )
}

export default ChartComponent;