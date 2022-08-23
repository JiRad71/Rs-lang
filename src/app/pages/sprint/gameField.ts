import Component from '../../../common/Component';
import Timer from './timer';
import FinishGame from './finishGame';
import { IWordsData } from './interfaces';


class GameField extends Component {
  onClose: () => void;
  onAnswer: () => void;
  data: IWordsData[];

  constructor(parentNode: HTMLElement, data: IWordsData[]) {
    super(parentNode, 'div', 'game-field');
    this.data = data;

    const closeBtn = new Component(this.node, 'button', 'close-btn', 'close');
    closeBtn.node.onclick = () => this.onClose();

    const fieldContainer = new Component(this.node, 'div', 'container');
    const totalTitle = new Component(fieldContainer.node, 'h3', 'total-title', 'Текущий счёт: ');
    const timer = new Timer(fieldContainer.node, 60);

    const progress = new Component(fieldContainer.node, 'div', 'progress');
    const circle1 = new Component(progress.node, 'span', 'progress__item');
    const circle2 = new Component(progress.node, 'span', 'progress__item');
    const circle3 = new Component(progress.node, 'span', 'progress__item');
  }
}

export default GameField;
