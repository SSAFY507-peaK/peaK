import ReactGA, { EventArgs } from 'react-ga';

interface CustomEventArgs extends EventArgs {
  userId: string;
}

export function ClickTracker(idolName:string, userId:string) {
  ReactGA.event({
    category: idolName,
    action: 'Click',
    // label: `{idolName}`,
    value: 1,
    userId: userId,
  } as CustomEventArgs);
}

