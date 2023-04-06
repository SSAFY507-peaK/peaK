import CarouselCustom from "../components/Carousel/CarouselCustom.jsx";
import TitleContent from "../components/TitleContent";
import Top8 from "../components/MainPage/Top8";
import TrendKeyword from "../components/MainPage/TrendKeyword";
import { TrendNewsListType } from "../_utils/Types.js";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router";

// import CommonDiv from "../components/MainPage/CommonDiv";
// import MainDiv from "../components/MainDiv";
// import NameDiv from "../components/NameDiv";
// import ReactGA from "react-ga";

// import { useEffect } from "react";

// import {useSearchParams} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {CreateNickname, CreateTOKEN, CreateUserId} from "../_store/slices/UserSlice";
// import {RootState} from "../_store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function loader() {
  let TrendNewsList,
    TrendYoutubeList = null;

  await axios
    .get(`${BASE_URL}/api/news/list/all-idol`)
    .then(response => {
      TrendNewsList = response.data;
    })
    .catch(error => console.log(error));

  return [TrendNewsList];
  // return [TrendNewsList, TrendYoutubeList];
}

// type CarouselCustomDivType = {
//   ratio: number;
// };

const CarouselDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// const CarouselCustomDiv = styled.div<CarouselCustomDivType>`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto;
//   flex: ${props => props.ratio};
// `;

const MainGrid = styled.div`
  display: grid;
  width: 100%;
  height: auto;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 70vh auto;
  gap: 25px;
`;

function MainPage() {
  /*
   * 로그인을 하면 params로 token, nickname, userid가 넘어와,,,
   * 만약 메인에 왔는데 params가 있다? 그럼 이 값들을 redux에 저장하고 pushState를 이용해서 url을 깨끗하게 해.
   *
   * 메인에 왔는데 params가 없어? 그럼 리덕스에 이 값이 있는지 찾아봐...
   * 이 값이 있으면 나는 로그인했던 사용자인거지..(사실 여기서도 토큰 유효성 검사를 해야할 듯 하다)
   *
   * 리덕스에도 토큰이 없어? 그러면 나는 로그인을 안 한 사람이야 => imtro로 보내버리자...
   */

  // const [query, setQuery] = useSearchParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // let userId = useSelector((state:RootState) => state.userInfo.userId);
  // let token = useSelector((state:RootState) => state.userInfo.TOKEN);
  //
  // useEffect(() => {
  //   if (query.get('token')) {
  //     dispatch(CreateTOKEN(query.get('token')));
  //     dispatch(CreateUserId(query.get('userId')));
  //     dispatch(CreateNickname(query.get('nickname')));
  //     ReactGA.set({ userId: userId });
  //     window.history.pushState({}, "", "/")
  //   }
  //   else {
  //     if (token !== "") {
  //       ReactGA.set({ userId: userId });
  //     }
  //     else {
  //       navigate('/intro');
  //     }
  //   }
  // }, [dispatch, navigate, query, token, userId]);
  const TrendNewsList = useLoaderData() as TrendNewsListType[];
  // const TrendYoutubeList = [
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐..",
  //     src: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
  //   },
  //   {
  //     title: "(4K UHD) [최초공개] KF-21 무장분리・기..",
  //     content:
  //       "대한민국의 KF-21이 공군 비행단에서 이륙하여 남해 상공에서 공대공 무장분리 시험과 공중 .. ",
  //     src: "https://i.ytimg.com/vi/ff68QPAI6YI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-eVctdC6EbDG7T7D0SHV5yCWYRw",
  //   },
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐..",
  //     src: "https://i.ytimg.com/vi/ff68QPAI6YI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-eVctdC6EbDG7T7D0SHV5yCWYRw",
  //   },
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "대한민국의 KF-21이 공군 비행단에서 이륙하여 남해 상공에서 공대공 무장분리 시험과 공중 .. ",
  //     src: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
  //   },
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐..",
  //     src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20101101_73%2Fjmclub2_1288617811796TklMy_jpg%2F246168185_f48ed70ffe_o_jmclub2.jpg&type=a340",
  //   },
  //   {
  //     title: "(4K UHD) [최초공개] KF-21 무장분리・기..",
  //     content:
  //       "대한민국의 KF-21이 공군 비행단에서 이륙하여 남해 상공에서 공대공 무장분리 시험과 공중 .. ",
  //     src: "https://i.ytimg.com/vi/ff68QPAI6YI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-eVctdC6EbDG7T7D0SHV5yCWYRw",
  //   },
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐..",
  //     src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20101101_73%2Fjmclub2_1288617811796TklMy_jpg%2F246168185_f48ed70ffe_o_jmclub2.jpg&type=a340",
  //   },
  //   {
  //     title: "4 시간 지브리 메들리 피아노 💖 ..",
  //     content:
  //       "대한민국의 KF-21이 공군 비행단에서 이륙하여 남해 상공에서 공대공 무장분리 시험과 공중 .. ",
  //     src: "https://i.ytimg.com/vi/ff68QPAI6YI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-eVctdC6EbDG7T7D0SHV5yCWYRw",
  //   },
  // ];
  const CarouselData = (
    <CarouselDiv>
      <CarouselCustom data={TrendNewsList[0]} />
    </CarouselDiv>
  );
  return (
    // <>
    //   <MainDiv style={{ marginBottom: "2vh" }}>
    //     <CommonDiv
    //       type={true}
    //       firstWord="랭킹"
    //       secondWord="Top 8"
    //       ratio="0.7"
    //       mr={true}
    //       data={Top8()}
    //     />
    //     <CommonDiv
    //       type={false}
    //       firstWord="인기"
    //       secondWord="키워드"
    //       ratio="0.3"
    //       data={<TrendKeyword />}
    //     />
    //   </MainDiv>
    //   <MainDiv>
    //     <CarouselCustomDiv ratio={0.47}>
    //       <NameDiv type={false} firstWord="트렌딩" secondWord="뉴스" />
    //       <CarouselDiv>
    //         <CarouselCustom data={TrendNewsList[0]} />
    //       </CarouselDiv>
    //     </CarouselCustomDiv>
    //     <CarouselCustomDiv ratio={0.47}>
    //       <NameDiv type={false} firstWord="트렌딩" secondWord="유튜브" />
    //       <CarouselDiv>{/* <CarouselCustom items={TrendYoutubeList} /> */}</CarouselDiv>
    //     </CarouselCustomDiv>
    //   </MainDiv>
    // </>
    <MainGrid>
      <TitleContent
        data={Top8()}
        gridColumn="1 / 4"
        title={
          <h3>
            랭킹 <span style={{ color: "var(--purple500-color)" }}>Top8</span>
          </h3>
        }
      />
      <TitleContent
        data={<TrendKeyword />}
        gridColumn="4 / 5"
        title={
          <h3>
            인기 <span style={{ color: "var(--purple500-color)" }}>키워드</span>
          </h3>
        }
      />
      <TitleContent
        data={CarouselData}
        gridColumn="1 / 3"
        noContentBackground={true}
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>뉴스</span>
          </h3>
        }
      />
      <TitleContent
        gridColumn="3 / 5"
        noContentBackground={true}
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>유튜브</span>
          </h3>
        }
      />
    </MainGrid>
  );
}

export default MainPage;
