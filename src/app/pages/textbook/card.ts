import { IWordsData } from "../../../asset/utils/types";
import Component from "../../../common/Component";


class Card extends Component {
  itemWordsTranslate: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, element: IWordsData) {
    super(parentNode, 'div', 'item');
    const itemWrapperImg = new Component(this.node, 'div', 'item__img');
    const itemImg = new Component(itemWrapperImg.node, 'img');
    this.itemWordsTranslate = new Component(this.node, 'div', 'item__words-translate');
    const itemWord = new Component(this.itemWordsTranslate.node, 'p', 'item__word');
    itemImg.node.setAttribute('src', `https://rss-lang-backends.herokuapp.com/${element.image}`);

    const itemWordEng = new Component(itemWord.node, 'span', 'item__word-eng', `${element.word}`);
    const itemWordTranscript = new Component(itemWord.node, 'span', 'item__word-transcript', `${element.transcription}`);
    const itemSeparator = new Component(itemWord.node, 'span', 'item__separator', `|`);
    const itemWordTranslate = new Component(itemWord.node, 'span', 'item__word-translate', `${element.wordTranslate}`);
    const itemSpeaker = new Component(itemWord.node, 'span', 'item__speaker');
    itemSpeaker.node.onclick = () => {
      new Audio(`https://rss-lang-backends.herokuapp.com/${element.audio}`).play();
    }
    const itemExplain = new Component(this.itemWordsTranslate.node, 'p', 'item__explain');
    const itemExplainEng = new Component(itemExplain.node, 'span', 'item__explain-eng', `${element.textMeaning}`);
    const itemExplainTranslate = new Component(itemExplain.node, 'span', 'item__explain-translate', `${element.textMeaningTranslate}`);
    const itemSpeakerExplain = new Component(itemExplain.node, 'span', 'item__speaker');
    itemSpeakerExplain.node.onclick = () => {
      new Audio(`https://rss-lang-backends.herokuapp.com/${element.audioMeaning}`).play();
    }
    const itemExample = new Component(this.itemWordsTranslate.node, 'p', 'item__example');
    const itemExampleEng = new Component(itemExample.node, 'span', 'item__example-eng', `${element.textExample}`);
    const itemExampleTranslate = new Component(itemExample.node, 'span', 'item__example-translate', `${element.textExampleTranslate}`);
    const itemSpeakerExample = new Component(itemExample.node, 'span', 'item__speaker');
    itemSpeakerExample.node.onclick = () => {
      new Audio(`https://rss-lang-backends.herokuapp.com/${element.audioExample}`).play();
    }
  }

  addButtons() {
    const itemButtons = new Component(this.itemWordsTranslate.node, 'div', 'item__buttons');
    const btnDifficult = new Component(itemButtons.node, 'button', 'difficult', 'Сложное');
    const btnLearned = new Component(itemButtons.node, 'button', 'learned', 'Изученное');
  }
}

export default Card;
