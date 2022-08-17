import { renderRegiserContent } from './registerContent';

const MAIN_SELECTOR = 'main';
const REGISTER_SELECTOR = '.register';

export const renderRegisterPage = (): void => {
  const main = document.getElementById(MAIN_SELECTOR) as HTMLDivElement;
  const register = document.querySelector(REGISTER_SELECTOR) as HTMLSpanElement;

  register?.addEventListener('click', () => {
    main.innerHTML = ''
    main.innerHTML = renderRegiserContent()
  });
};