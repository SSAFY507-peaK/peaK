import ECharts from "echarts-for-react";
import styled from "styled-components";
import { useState } from "react";

// function f() {
//   // 나중을 위해 함수로 묶어서 주석 처리한 것
//   let now = new Date();
//   let D1 = new Date(now.setDate(now.getDate() - 1))
//   let D2 = new Date(now.setDate(now.getDate() - 2))
//   let D3 = new Date(now.setDate(now.getDate() - 3))
//   let D4 = new Date(now.setDate(now.getDate() - 4))
//   let D5 = new Date(now.setDate(now.getDate() - 5))
//   let D6 = new Date(now.setDate(now.getDate() - 6))
//   let D7 = new Date(now.setDate(now.getDate() - 7))
// }

// legend: {
//   data: ['Line 1', 'Line 2', 'Line 3'],
//   orient: 'vertical',
//   right: 0, // legend를 오른쪽에 배치
//   top: 0,
//   bottom: 0,
// },
// grid: {
//   left: 70, // 그래프를 오른쪽으로 이동
//   right: 100, // legend를 오른쪽에 배치
//   top: 30,
//   bottom: 30,
// },

function IdolChart() {
  let labels = ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "오늘"];
  const [options, setOptions] = useState({
    color: ["red", "blue", "yellow", "green", "skyblue", "purple"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["세븐틴", "에잇틴", "나인틴", "투엔티", "2NE1"],
      orient: "vertical",
      top: "200vw",
      right: "right",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
    },
    yAxis: [
      {
        type: "value",
        min: 1,
        interval: 20,
        inverse: true,
      },
    ],
    series: [
      {
        name: "세븐틴",
        type: "line",
        data: [22, 11, 11, 11, 10, 3, 1],
      },
      {
        name: "에잇틴",
        type: "line",
        data: [2, 3, 4, 5, 6, 7, 9],
      },
      {
        name: "나인틴",
        type: "line",
        data: [15, 15, 13, 13, 15, 15, 18],
      },
      {
        name: "투엔티",
        type: "line",
        data: [7, 8, 9, 8, 9, 8, 19],
      },
      {
        name: "2NE1",
        type: "line",
        data: [1, 1, 1, 1, 1, 1, 2],
      },
    ],
  });

  return (
    <ECharts option={options} style={{ height: "80%", width: "80%" }} opts={{ renderer: "svg" }} />
  );
}

export default IdolChart;
