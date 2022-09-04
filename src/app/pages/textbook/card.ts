import { ICastom, ICreateUserWord, IUserData, IUserStat, IUserWordsCustom, IWordsData } from "../../../asset/utils/types";
import Component from "../../../common/Component";
import { Request } from "../../../asset/utils/requests"

class Card extends Component {
  itemWordsTranslate: Component<HTMLElement>;
  request: Request;
  element: IWordsData;

  constructor(parentNode: HTMLElement, element: IWordsData) {
    super(parentNode, 'div', 'item');
    this.request = new Request()
    this.element = element;

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

  addButtons(difficult?: boolean) {
    const itemButtons = new Component(this.itemWordsTranslate.node, 'div', 'item__buttons');
    if (difficult) {
      const btnDifficult = new Component(itemButtons.node, 'button', 'difficult', 'Сложное');
      btnDifficult.node.onclick = () => {
        const userWords: IUserWordsCustom = {
          difficulty: 'hard',
          optional: {
            rightAnswers: 0,
            sprint: {
              rightAnswer : 0,
              falseAnswer: 0,
              used: false,
            },
            audioCall: {
              rightAnswer: 0,
              falseAnswer: 0,
              used: false,
            },
          }
        }
        this.request.createUserWordCastom(this.element._id, userWords, 'POST')
        btnDifficult.node.classList.add('hard')
        this.destroy();
      }
    }
    const btnLearned = new Component(itemButtons.node, 'button', 'learned', 'Изученное');
    btnLearned.node.onclick = () => {
      this.destroy();
      const userWords: IUserWordsCustom = {
        difficulty: 'easy',
        optional: {
          rightAnswers: 0,
          sprint: {
            rightAnswer : 0,
            falseAnswer: 0,
            used: false,
          },
          audioCall: {
            rightAnswer: 0,
            falseAnswer: 0,
            used: false,
          },
        }
      }
      this.request.createUserWordCastom(this.element._id, userWords, 'POST')
      this.request.getLearnedWord()
        .then((data: IUserStat) => {
          data.learnedWords++;
          const param = {
            learnedWords: data.learnedWords
          }
          this.request.putLearnedWord(param)
        })
      this.request.deleteUserWord(this.element._id);
    }
  }
}

export default Card;
