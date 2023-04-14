import { ga } from "react-ga";


/** User의 활동을 Google Analytics */
export function ClickTracker(idolName: string, userId: string) {

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
  ga('set', 'page', page); // 페이지 설정
  ga('send', 'pageview', page); // 페이지뷰 전송
}
