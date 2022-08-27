import Component from '../../../common/Component';
import Timer from './timer';
import { IWordsData } from './interfaces';


class GameField extends Component {
  onClose: () => void;
  data: IWordsData[];
  totalTitle: Component<HTMLElement>;
  score: Component<HTMLElement>;
  progress: Component<HTMLElement>;
  circles: Component<HTMLElement>[];
  scale: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, data: IWordsData[]) {
    super(parentNode, 'div', 'game-field');
    this.data = data;

    const closeBtn = new Component(this.node, 'button', 'close-btn', 'close');
    closeBtn.node.onclick = () => this.onClose();

    const fieldContainer = new Component(this.node, 'div', 'container');
    this.totalTitle = new Component(fieldContainer.node, 'h3', 'total-title', `Текущий счёт: `);
    this.score = new Component(this.totalTitle.node, 'span', 'total-title__score', '0');
    this.scale = new Component(this.totalTitle.node, 'span', 'total-title__scale');
    const timer = new Timer(fieldContainer.node, 60);

    this.progress = new Component(fieldContainer.node, 'div', 'progress');
    this.circles = [];
    for (let i = 0; i < 3; i += 1) {
      this.circles.push(new Component(this.progress.node, 'span', 'progress__item'));
    }
  }
}

export default GameField;
