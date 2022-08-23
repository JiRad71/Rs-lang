import { renderTextbookContent } from './textbookContent';

const MAIN_SELECTOR = 'main';
const TEXTBOOK_SELECTOR = '.textbook';

export const renderTextbookPage = (): void => {
  const main = document.getElementById(MAIN_SELECTOR) as HTMLDivElement;
  const textbook = document.querySelector(TEXTBOOK_SELECTOR) as HTMLSpanElement;

  textbook?.addEventListener('click', () => {
    main.innerHTML = ''
    main.innerHTML = renderTextbookContent()
  });
};