import Component from '../../../common/Component';
import { random } from '../../../asset/utils/usefull';
import { IWordsData } from '../../../asset/utils/types';

class Question extends Component {
  onClose: () => void;
  onAnswer: (answer: boolean) => void;
  data: IWordsData[];
  answer: string;
  translate: string;

  constructor(parentNode: HTMLElement | null, data: IWordsData[]) {
    super(parentNode, 'div', 'question-block');
    if (data[0] && data[1]) {
      this.data = data;
      this.answer = this.data[0].wordTranslate;
      this.translate = this.data[random(0, 1)].wordTranslate;

      const question = new Component(this.node, 'h3', 'question', `${this.data[0].word}`);
      const translate = new Component(this.node, 'p', 'translate', `${this.translate}`);

      const btnsBlock = new Component(this.node, 'div', 'btns-block');
      const btnTrue = new Component(btnsBlock.node, 'button', 'btn-answer btn-true', 'Верно');
      const btnFalse = new Component(btnsBlock.node, 'button', 'btn-answer btn-false', 'Не верно');
      
      btnTrue.node.onclick = () => this.onAnswer(true);
      btnFalse.node.onclick = () => this.onAnswer(false);
    } else {
      const message = new Component(this.node, 'h3', 'question-block__message', 'Список сложных слов пуст');
    }

  }
}

export default Question;