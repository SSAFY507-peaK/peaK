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
    maintainAspectRatio: false,
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
    elements: {
      point:{
          radius: 0
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: false,
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
        fill: {
          target: 'start',
          above: 'rgba(255, 99, 132, 0.5)',   // Area will be red above the origin
        },
      },
      {
        label: '부정',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: {
          target: 'start',
          above: 'rgba(53, 162, 235, 0.5)',   // Area will be red above the origin
        },
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default IdolEmotionChart;

