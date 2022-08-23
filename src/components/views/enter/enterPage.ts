import { renderEnterContent } from './enterContent';

const MAIN_SELECTOR = 'main';
const ENTER_SELECTOR = '.enter';

export const renderEnterPage = (): void => {
  const main = document.getElementById(MAIN_SELECTOR) as HTMLDivElement;
  const enter = document.querySelector(ENTER_SELECTOR) as HTMLSpanElement;

  enter?.addEventListener('click', () => {
    main.innerHTML = ''
    main.innerHTML = renderEnterContent()
  });
};