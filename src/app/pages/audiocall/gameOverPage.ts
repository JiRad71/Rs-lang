import Component from "../../../common/Component";
import { IQuestionData, Ianswers } from "./dataModel";


type IGameResults = {
  rightAnswer: Ianswers;
  userAnswer: Ianswers
}[]

class GameOverPage extends Component {
  onNext: () => void;
  onCategories: (categories: string) => void
  resultList: Component<HTMLElement>;
  resultRight: Component<HTMLElement>;
  game: Component<HTMLElement>;
  resultWrong: Component<HTMLElement>;
  resultRightItem: Component<HTMLElement>;
  resultWrongItem: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, results: IGameResults) {
    super(parentNode);
    this.game = new Component(this.node, 'div', 'game');
    const header = new Component(this.game.node, 'h2', 'heading', 'Статистика')
    let countRight = 0
    let countWrong = 0

    const resultList = new Component(this.game.node, 'div', 'result-list', '')
    this.resultRight = new Component(resultList.node, 'div', 'result-right', '')
    const headerRight = new Component(this.resultRight.node, 'h3', 'heading', 'Правильные ответы')


    results.forEach(i => {
      const voiceRight = new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`)

      if (i.rightAnswer.translate === i.userAnswer.translate) {
        this.resultRightItem = new Component(this.resultRight.node, 'p', 'rightAnswer', '')
        const voiceRightAnswer = new Component(this.resultRightItem.node, 'span', 'voice-stat', '')
        voiceRightAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`).play();
        }
        voiceRightAnswer.node.append(voiceRight)
        new Component(this.resultRightItem.node, 'span', '', ` ${i.rightAnswer.translate} - `)
        new Component(this.resultRightItem.node, 'span', '', `${i.rightAnswer.word}`)
        countRight++
      }
    })
    const countRightComponent = new Component(this.resultRight.node, 'div', 'count-right', 'Знаю всего: ');
    const countRightComponentNumber = new Component(countRightComponent.node, 'span', 'count-right-number', `${countRight}`);


    this.resultWrong = new Component(resultList.node, 'div', '', '')
    const headerWrong = new Component(this.resultWrong.node, 'h3', 'heading', 'Ошибочные ответы')

    results.forEach(i => {
      const voiceWrong = new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`)

      if (i.rightAnswer.translate !== i.userAnswer.translate) {
        this.resultWrongItem = new Component(this.resultWrong.node, 'p', 'falseAnswer', '')
        const voiceWrongAnswer = new Component(this.resultWrongItem.node, 'span', 'voice-stat', '')
        voiceWrongAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`).play();
        }
        voiceWrongAnswer.node.append(voiceWrong)
        new Component(this.resultWrongItem.node, 'span', '', ` ${i.userAnswer.translate} - `)
        new Component(this.resultWrongItem.node, 'span', '', `${i.userAnswer.word}`)
        countWrong++
      }
    })
    const countWrongComponent = new Component(this.resultWrong.node, 'p', 'count-wrong', 'Ошибок всего: ');
    const countWrongComponentNumber = new Component(countWrongComponent.node, 'span', 'count-wrong-number', `${countWrong}`);


    const categoriesButton = new Component(this.node, 'button', 'category-button', 'К выбору категории')
    categoriesButton.node.onclick = () => this.onCategories('categories')
  }
}
export default GameOverPage;
