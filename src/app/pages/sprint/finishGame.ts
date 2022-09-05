import Component from '../../../common/Component';
import { IUsersAnswer } from '../../../asset/utils/types';

class FinishGame extends Component {
  nextGame: () => void;
  onClose: () => void;
  results: IUsersAnswer[];
  score: string;
  btnRestart: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, score: string) {
    super(parentNode, 'div', 'finish-game');
    this.results = [];
    this.score = score;
  }

  render(results: IUsersAnswer[]) {
    const titleTotal = new Component(this.node, 'h3', 'finish-game__title', `Ваш результат: ${this.score} очков`);

    const wrapper = new Component(this.node, 'div', 'wrapper');

    const table = new Component(wrapper.node, 'table', 'results-table');

    const row = new Component(table.node, 'tr', 'table-game-row');
    const column1 = new Component(row.node, 'th', 'table-column', 'Номер п/п');
    const column2 = new Component(row.node, 'th', 'table-column', 'Слово');
    const column3 = new Component(row.node, 'th', 'table-column', 'Вариант ответа');
    const column4 = new Component(row.node, 'th', 'table-column', 'Ваш ответ');
    const column5 = new Component(row.node, 'th', 'table-column', 'Правильный ответ');

    results.forEach((res, i) => {
      const row = new Component(table.node, 'tr', 'table-game-row');
      const frame = new Component(row.node, 'td', 'table-column', `${i+1}`);
      const frame1 = new Component(row.node, 'td', 'table-column', `${res.question}`);
      const frame3 = new Component(row.node, 'td', 'table-column', `${res.translate}`);
      const frame4 = new Component(row.node, 'td', 'table-column', `${res.usersAnswer}`);
      const frame2 = new Component(row.node, 'td', 'table-column', `${res.rightAnswer}`);
      if (res.result) {
        row.node.classList.add('bg-right-answer');
      } else {
        row.node.classList.add('bg-fail-answer');
      }
    });

    const btnsWrap = new Component(wrapper.node, 'div', 'btns-wrapper');
    this.btnRestart = new Component(btnsWrap.node, 'button', 'btn-restart', 'Играть');
    this.btnRestart.node.onclick = () => this.nextGame();
    const btnExit = new Component(btnsWrap.node, 'button', 'btn-exit', 'Выход');
    btnExit.node.onclick = () => this.onClose();
  }
}

export default FinishGame;