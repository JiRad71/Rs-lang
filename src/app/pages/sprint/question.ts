import Component from '../../../common/Component';
import { IWordsData } from './interfaces';

class Question extends Component {
  onClose: () => void;
  onAnswer: (answer: boolean) => void;
  currQuestion = 0;

  constructor(parentNode: HTMLElement, data: IWordsData) {
    super(parentNode);
    const question = new Component(this.node, 'h3', '', `${data.word}`);
    const translate = new Component(this.node, 'p', 'translate', `${data.wordTranslate}`);

    const btnTrue = new Component(this.node, 'button', 'btn-true', 'Верно');
    const btnFalse = new Component(this.node, 'button', 'btn-true', 'Не верно');
    btnTrue.node.onclick = () => this.onAnswer(true);
    btnFalse.node.onclick = () => this.onAnswer(false);

  }
}

export default Question;