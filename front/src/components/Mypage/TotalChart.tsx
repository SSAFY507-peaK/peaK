import { useCallback, useMemo, useState } from 'react';

import ReactEcharts from 'echarts-for-react';
import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";

interface Props {
  userName: string;
  setIdolName: React.Dispatch<React.SetStateAction<string>>;
}

interface SelecteType {
  name: string;
  value: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  /* width: 100%;
  height: 100%; */
`;

const ChartFrame = styled.div`
  height: 40vh;
  width: 35vw;
`;

function TotalChart({userName, setIdolName}:Props) {
  const [selectedData, setSelectedData] = useState<SelecteType>();
  const chartData = [
    { value: 45, name: "세븐틴" },
    { value: 30, name: "방탄소년단" },      
    { value: 15, name: "블랙핑크" },      
    { value: 5, name: "트와이스" },      
    { value: 5, name: "아이브" },
  ];
  
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: "20%",
        itemWidth: 20, // 항목의 너비
        itemHeight: 20, // 항목의 높이
        orient: 'vertical',
        right: 'right', // legend를 오른쪽에 위치시킵니다.
      },
      series: [
        {
          name: '나의 아이돌 관심도',
          type: 'pie',
          radius: ['40%', '80%'],
          avoidLabelOverlap: false,
          selectedMode: 'single',
          selectedOffset: 10,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'inner'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            scale: false,
            scaleSize: 10, // 크기 변경 값
            liftZ: 30 // 조각을 위로 올리기
          },
          labelLine: {
            show: false
          },
          data: chartData,
          selected: {
            [setSelectedData.name]: true,
          },
        }
      ],
      graphic: selectedData
        ? [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: selectedData.name + "\n" + selectedData.value,
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              },
            },
          ]
        : null,
    }
  }, [selectedData]);

  const onChartClick = useCallback((params:any) => {
    if (params.componentType === 'series') {
      // console.log('Selected pie index:', params.seriesIndex);
      console.log('Selected pie data:', params.data.name);
      setSelectedData(params.data);
      setIdolName(params.data.name);
    }
  }, []);

  return (
    <Wrapper>
      <TitleComponent blacktxt="전체" purpletxt="관심도" />
      <ChartFrame>
        <ReactEcharts
          option={options}
          // style={{ height: "90%", width: "90%" }}
          opts={{ renderer: 'svg'}}
          onEvents={{ 'click': onChartClick }}
        />
      </ChartFrame>
    </Wrapper>
  )
}

export default TotalChart;
