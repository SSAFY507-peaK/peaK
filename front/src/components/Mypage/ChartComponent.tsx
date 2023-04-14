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
        data: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', '오늘'],
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
        min: 0,
        interval: 5,
      }
    ],
    series: [
      {
        name: `나의 ${name}`,
        type: 'bar',
        data: idoldata.dataLst
      },
      {
        name: `평균 ${name}`,
        type: 'bar',
        data: idoldata.dataAvg
      },
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