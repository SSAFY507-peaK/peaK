import ReactGA, { EventArgs } from 'react-ga';
import { useAppSelector } from '../../_hooks/hooks';

interface CustomEventArgs extends EventArgs {
  userId: number;
}

/** User의 활동을 Google Analytics */
export function ClickTracker(idolName:string) {
  // const userId:number = useAppSelector(state => state.userInfo.userId)
  const userId:number = 2737090856

  ReactGA.event({
    category: idolName,
    action: 'Click',
    // label: `{idolName}`,
    value: 1,
    userId: userId,
  } as CustomEventArgs);
}


export function TimeTracker(page:string) {
  ReactGA.set({ page: page }); // 현재 페이지의 경로를 전송합니다.
  ReactGA.pageview(page);
}
