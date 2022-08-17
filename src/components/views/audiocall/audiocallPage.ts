import { renderAudiocallContent } from './audiocalContent';

const MAIN_SELECTOR = 'main';
const AUDIOCALL_SELECTOR = '.audiocall';

export const renderAudiocallPage = (): void => {
  const main = document.getElementById(MAIN_SELECTOR) as HTMLDivElement;
  const register = document.querySelector(AUDIOCALL_SELECTOR) as HTMLSpanElement;

  register?.addEventListener('click', () => {
    main.innerHTML = ''
    main.innerHTML = renderAudiocallContent()
  });

};
