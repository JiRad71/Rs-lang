import Component from '../../../common/Component';
import { IUsersAnswer } from '../../../asset/utils/types';

class FinishGame extends Component {
  nextGame: () => void;
  onClose: () => void;
  results: IUsersAnswer[];
  score: string;
  btnRestart: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, score: string) {
    super(parentNode);
    this.results = [];
    this.score = score;
  }

  render(results: IUsersAnswer[]) {
    const title = new Component(this.node, 'h3', '', 'Результаты игры');

    const titleTotal = new Component(this.node, 'h4', '', `Ваш результат: ${this.score}`);

    const wrapper = new Component(this.node, 'div', 'wrapper');

    const table = new Component(wrapper.node, 'table', 'results-table');

    const row = new Component(table.node, 'tr', '');
    const column1 = new Component(row.node, 'th', '', 'Номер п/п');
    const column2 = new Component(row.node, 'th', '', 'Слово');
    const column3 = new Component(row.node, 'th', '', 'Вариант ответа');
    const column4 = new Component(row.node, 'th', '', 'Ваш ответ');
    const column5 = new Component(row.node, 'th', '', 'Правильный ответ');

    results.forEach((res, i) => {
      const row = new Component(table.node, 'tr', '');
      const frame = new Component(row.node, 'td', '', `${i+1}`);
      const frame1 = new Component(row.node, 'td', '', `${res.question}`);
      const frame3 = new Component(row.node, 'td', '', `${res.translate}`);
      const frame4 = new Component(row.node, 'td', '', `${res.usersAnswer}`);
      const frame2 = new Component(row.node, 'td', '', `${res.rightAnswer}`);
      if (res.result) {
        row.node.style.backgroundColor = '#14c80b';
      } else {
        row.node.style.backgroundColor = '#c80b0e';
      }
    });

    this.btnRestart = new Component(wrapper.node, 'button', '', 'Играть ещё');
    this.btnRestart.node.onclick = () => this.nextGame();
    const btnExit = new Component(wrapper.node, 'button', '', 'Выход');
    btnExit.node.onclick = () => this.onClose();
  }
}

export default FinishGame;