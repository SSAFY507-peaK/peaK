import { useEffect, useState } from "react";

import ECharts from "echarts-for-react";

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

type ChartIdolObjectType = {
  name?: string;
  data?: number[];
  type?: string;
  lineStyle?: { width: number };
};

function RankChart({ chartIdol }: any) {
  let labels = ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "오늘"];

  const [options, setOptions] = useState({
    color: ["#4CD7F6", "#6DBFFF", "#7166F9", "#C74BF6", "#F946FF"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: chartIdol.map((idol: ChartIdolObjectType) => idol.name),
      orient: "vertical",
      top: "170vw",
      right: "right",
    },
    grid: {
      left: "5%",
      right: "20%",
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
    series: chartIdol,
    graphic: {
      type: "line",
      $action: "merge",
    },
  });

  useEffect(() => {
    setOptions({
      color: ["#4CD7F6", "#6DBFFF", "#7166F9", "#C74BF6", "#F946FF"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {
        data: chartIdol.map((idol: ChartIdolObjectType) => idol.name),
        orient: "vertical",
        top: "170vw",
        right: "right",
      },
      grid: {
        left: "5%",
        right: "20%",
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
      series: chartIdol,
      graphic: {
        type: "line",
        $action: "merge",
      },
    });
  }, [chartIdol]);

  return (
    <ECharts
      option={options}
      style={{ height: "90%", width: "90%" }}
      opts={{ renderer: "svg" }}
      notMerge
    />
  );
}

export default RankChart;
