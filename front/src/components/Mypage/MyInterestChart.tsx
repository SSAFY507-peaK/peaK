import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';

const ChartFrame = styled.div`
  /* background-color: white; */
  /* border-radius: 20px; */
`;


function MyInterestChart() {
  const gaugeData = [
    {
      value: 67,
      name: "Perfect",
      // title: {
      //   offsetCenter: ["0%", "-30%"]
      // },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "-20%"]
      }
    }
  ];

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 90,  // 시작점
        endAngle: -270,  // 끝점
        pointer: { // 게이지 화살표 안보이게
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,   // 끝이 둥글게
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646"
          }
        },
        axisLine: {
          lineStyle: {  // 게이지 두께
            width: 10
          }
        },
        splitLine: {    // 눈금 안보이게
          show: false,
        },
        axisTick: {    // 눈금 안보이게
          show: false
        },
        axisLabel: {  // 게이지 인덱스 안보이게
          show: false,
          distance: 10
        },
        data: gaugeData,
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}점"
        }
      }
    ]
  };
  
  return (
    <ChartFrame>
      <ReactEcharts
        option={option}
        notMerge={true}
        style={{ height: "30vh" }}
        lazyUpdate={true}
      />
    </ChartFrame>
  )
}

export default MyInterestChart;