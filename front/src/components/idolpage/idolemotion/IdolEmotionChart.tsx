import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import React from 'react';
import { faker } from '@faker-js/faker';

// import styled from 'styled-components';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function IdolEmotionChart() {
  const options = {
    responsive: true,     // 부모 컴포넌트의 크기에 반응형 여부
    interaction: {        // 커서에 따라 값을 보여줌
      mode: "index" as const,
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        from: 0.5,
        to: 0.5,
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 1,
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['월', '화', '수', '목', '금', '토', '일'];

  const data = {
    labels,
    datasets: [
      {
        label: '긍정',
        data: labels.map(() => faker.datatype.float({ min: 0, max: 1 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '부정',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default IdolEmotionChart;

