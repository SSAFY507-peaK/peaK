import ReactGA, { EventArgs, ga } from "react-ga";

import { useAppSelector } from "../_hooks/hooks";

// interface CustomEventArgs extends EventArgs {
//   userId: string;
// }

/** User의 활동을 Google Analytics */
export function ClickTracker(idolName: string) {
  const userId:string = useAppSelector(state => state.userInfo.userId)
  // const userId: string = "2737090856";

//   ReactGA.event({
//     category: idolName,
//     action: "Click",
//     // label: `{idolName}`,
//     value: 1,
//     userId: userId,
//   } as CustomEventArgs);
  ga('send', {
    hitType: 'event',
    eventCategory: idolName,
    eventAction: 'Click',
    // eventLabel: `{idolName}`,
    eventValue: 1,
    userId: userId // 사용자 ID 추가
  });

}

export function TimeTracker(page: string) {
  // ReactGA.set({ page: page }); // 현재 페이지의 경로를 전송합니다.
  // ReactGA.pageview(page);
  ga('set', 'page', page); // 페이지 설정
  ga('send', 'pageview', page); // 페이지뷰 전송

}
