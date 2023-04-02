import ECharts from "echarts-for-react";
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

function RankChart() {
  let labels = ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "오늘"];
  const [options, setOptions] = useState({
    color: ["#93F2A2", "#DAB4B4", "#FFD99E", "#FCA7A7", "#9FC6F4", "#A869CD"],
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
      right: "15%",
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
        inverse: true,
      },
    ],
    series: [
      {
        name: "세븐틴",
        type: "line",
        data: [62, 11, 11, 11, 10, 3, 1],
        lineStyle: {
          width: 3,
        },
      },
      {
        name: "에잇틴",
        type: "line",
        data: [2, 3, 4, 5, 6, 7, 9],
        lineStyle: {
          width: 3,
        },
      },
      {
        name: "나인틴",
        type: "line",
        data: [15, 15, 13, 13, 15, 15, 18],
        lineStyle: {
          width: 3,
        },
      },
      {
        name: "투엔티",
        type: "line",
        data: [7, 8, 9, 8, 9, 8, 19],
        lineStyle: {
          width: 3,
        },
      },
      {
        name: "2NE1",
        type: "line",
        data: [1, 1, 1, 1, 1, 1, 2],
        lineStyle: {
          width: 3,
        },
      },
    ],
  });

  return (
    <ECharts option={options} style={{ height: "80%", width: "80%" }} opts={{ renderer: "svg" }} />
  );
}

export default RankChart;
