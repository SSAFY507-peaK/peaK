import { useCallback, useEffect, useMemo, useState } from 'react';

import { IdolInterest } from '../../_utils/Types';
import ReactEcharts from 'echarts-for-react';
import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";
import { useAppSelector } from '../../_hooks/hooks';

interface Props {
  userName: string;
  setIdolName: React.Dispatch<React.SetStateAction<string>>;
}

interface SelectType {
  name: string;
  value: number;
  itemStyle?: any;
  selected?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
`;

const ChartFrame = styled.div`
  height: 40vh;
  width: 35vw;
`;

function TotalChart({userName, setIdolName}:Props) {
  let chartData:SelectType[] = [];
  const color:string[] = ["#4CD7F6","#6DBFFF","#7166F9", "#C74BF6", "#F946FF"]

  const idolData = useAppSelector<IdolInterest>(state => state.myInterest)
  for (let i = 0; i < idolData.idols.length; i++ ) {
    if (i === 0) {
      chartData.push( { name: idolData.idols[i].idol, value: idolData.idols[i].value, itemStyle: {color: color[i]}, selected: true})
    } else {
      chartData.push( { name: idolData.idols[i].idol, value: idolData.idols[i].value, itemStyle: {color: color[i]}})
    }
  }
  const [selectedData, setSelectedData] = useState<SelectType>(chartData[0]);
  
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
          opts={{ renderer: 'svg'}}
          onEvents={{ 'click': onChartClick }}
        />
      </ChartFrame>
    </Wrapper>
  )
}

export default TotalChart;
