import React, { useState, useRef, useEffect, useCallback } from "react";
import { SectionOne, SectionTwo, SectionThree, SectionFour} from "./SectionPages";

function TmpFullPage() {
  // 현재 내 위치를 알기 위함
  const [scrollIdx, setScrollIdx] = useState<number>(1);
  // 전체 페이지, 스크롤바를 조작하기 위해 필요함
  const mainWrapperRef = useRef<any>();

  // const DIVIDER_HEIGHT:number = 4;

  const wheelHandler = useCallback((e:any):any => {
    e.preventDefault();

    const deltaY:number = e.deltaY; // 양수면 위를 뜻하고 음수면 아래를 뜻함
    const scrollTop:number = mainWrapperRef.current.scrollTop; // 현재 스크롤 위치(상단 기준)
    const pageHeight:number = window.innerHeight; // 화면 세로길이 === 100vh

    console.log(`deltaY, scrollTop, pageHeight : ${ deltaY } ${scrollTop} ${ pageHeight }`);
    console.log(scrollIdx);
    // 양수 === 스크롤을 내림
    if (deltaY > 0) {
      // 1페이지인데 아래로 감 => 2페이지로 이동
      if (0 <= scrollTop && scrollTop < pageHeight) {

        window.scrollBy({
          top: pageHeight,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(2);
      }
      // 2페이지인데 아래로 감 => 3페이지로 이동
      else if (pageHeight <= scrollTop && scrollTop < pageHeight * 2) {
        // window.scrollTo({
        //   top: pageHeight * 2,
        //   left: 0,
        //   behavior: "smooth",
        // });
        window.scrollBy({
          top: pageHeight,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(3);
      }
      // 3페이지인데 아래로 감 => 4페이지로 이동
      else if (pageHeight * 2 <= scrollTop && scrollTop < pageHeight * 3) {
        // window.scrollTo({
        //   top: pageHeight * 3,
        //   left: 0,
        //   behavior: "smooth",
        // });
        window.scrollBy({
          top: pageHeight,
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
      if (pageHeight <= scrollTop && scrollTop < pageHeight * 2) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx((prev:number):number => prev--);
      }
      // 3페이지인데 위로 감 => 2페이지로 이동
      else if (pageHeight * 2 <= scrollTop && scrollTop < pageHeight * 3) {
        window.scrollTo({
          top: pageHeight,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx((prev:number):number => prev--);
      } // 4페이지인데 위로 감 => 3페이지로 이동
      else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
        window.scrollTo({
          top: pageHeight * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx((prev:number):number => prev--);
      }
    }
  }, []);

  useEffect(() => {
    const wrapperRefCurrent = mainWrapperRef.current;
    wrapperRefCurrent.addEventListener("wheel", wheelHandler);
  }, []);



  return (
    <>
      <div ref={mainWrapperRef}>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
    </>
  );
}

export default TmpFullPage;