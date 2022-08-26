import Component from '../../../common/Component';
import Timer from './timer';
import { IWordsData } from './interfaces';


class GameField extends Component {
  onClose: () => void;
  data: IWordsData[];
  totalTitle: Component<HTMLElement>;
  score: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, data: IWordsData[]) {
    super(parentNode, 'div', 'game-field');
    this.data = data;

    const closeBtn = new Component(this.node, 'button', 'close-btn', 'close');
    closeBtn.node.onclick = () => this.onClose();

    const fieldContainer = new Component(this.node, 'div', 'container');
    this.totalTitle = new Component(fieldContainer.node, 'h3', 'total-title', `Текущий счёт: `);
    this.score = new Component(this.totalTitle.node, 'span', 'total-title__score', '0');
    const timer = new Timer(fieldContainer.node, 60);

    const progress = new Component(fieldContainer.node, 'div', 'progress');
    const circle1 = new Component(progress.node, 'span', 'progress__item');
    const circle2 = new Component(progress.node, 'span', 'progress__item');
    const circle3 = new Component(progress.node, 'span', 'progress__item');
  }

  // changeTotal(num: number) {
  //   this.count += num;
  // }
}

export default GameField;
