import React, { useState, useRef, useEffect, useCallback } from "react";
import { SectionOne, SectionTwo, SectionThree, SectionFour} from "./SectionPages";
import NavBar from "../../components/LayoutPage/NavBar";
import {FullPageContainer} from "./SectionComponents";
import DotComponent from "./DotComponent";

function TmpFullPage() {
  const [scrollIdx, setScrollIdx] = useState<number>(1);  // 현재 내 위치를 알기 위함
  const mainWrapperRef = useRef<any>();  // 전체 페이지, 스크롤바를 조작하기 위해 필요함

  const wheelHandler = useCallback((e:any):any => {
    e.preventDefault();

    const deltaY: number = e.deltaY;                            // 양수면 위를 뜻하고 음수면 아래를 뜻함
    const scrollTop: number = mainWrapperRef.current.scrollTop; // 현재 스크롤 위치(상단 기준)
    const pageHeight: number = mainWrapperRef.current.getBoundingClientRect().height;      // 화면 세로길이 !== 100vh, 미세하게 값이 달라지는 것을 잡아내야 함
    const scrollToTop: number = Math.ceil(pageHeight);

    // console.log(pageHeight)
    // console.log(`옮겨진 곳 scrollTop : ${mainWrapperRef.current.scrollTop}`)
    // console.log(`현재 idx : ${scrollIdx}`)

    // 양수 === 스크롤을 내림
    if (deltaY > 0) {
      if (0 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight) {  // 1페이지인데 아래로 감 => 2페이지로 이동
      // if (scrollIdx === 1) {
        console.log(scrollIdx);
        mainWrapperRef.current.scrollTo({
          top: scrollToTop,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(2);
      }
      // 2페이지인데 아래로 감 => 3페이지로 이동
      else if (pageHeight <= scrollTop + 0.1  && scrollTop + 0.1 < pageHeight * 2) {
      // else if (scrollIdx === 2) {
        console.log(scrollIdx);
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(3);
      }
      // 3페이지인데 아래로 감 => 4페이지로 이동
      else if (pageHeight * 2 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 3) {
      // else if (scrollIdx === 3) {
        console.log(scrollIdx);
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 3,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(4);
      }
      // 현재 마지막 페이지인데 아래로 간다.... 그만가!!!
    }
    // 음수 === 스크롤 올림
    else if (deltaY < 0) {
      // 2페이지인데 위로 감 => 1페이지로 이동
      if ( pageHeight <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 2) {
      // if (scrollIdx === 2) {
        mainWrapperRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(1);
      }
      // 3페이지인데 위로 감 => 2페이지로 이동
      else if (pageHeight * 2 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 3) {
      // else if (scrollIdx === 3) {
        console.log("지금 3페이지야")
        mainWrapperRef.current.scrollTo({
          top: scrollToTop,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(2);
      } // 4페이지인데 위로 감 => 3페이지로 이동
      else if (pageHeight * 3 <= scrollTop + 0.1  && scrollTop + 0.1 < pageHeight * 4) {
      // else if (scrollIdx === 4) {
        console.log("지금 4페이지야")
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(3);
      }
    }
  }, [scrollIdx]);

  useEffect(() => {
    const wrapperRefCurrent = mainWrapperRef.current;
    wrapperRefCurrent.addEventListener("wheel", wheelHandler);
    return () => wrapperRefCurrent.removeEventListener("wheel", wheelHandler);
  }, [wheelHandler]);

  return (
    <FullPageContainer ref={mainWrapperRef} >
      <NavBar />
      <DotComponent scrollIdx={scrollIdx} />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </FullPageContainer>
  );
}

export default TmpFullPage;