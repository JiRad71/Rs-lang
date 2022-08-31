import Component from "../../../common/Component";
import { IQuestionData, Ianswers } from "./dataModel";


type IGameResults = {
  rightAnswer: Ianswers;
  userAnswer: Ianswers
}[]

class GameOverPage extends Component {
  onNext: () => void;
  onCategories: (categories: string) => void
  resultTable: Component<HTMLElement>;
  resultTr: Component<HTMLElement>;
  game: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, results: IGameResults) {
    super(parentNode);
    this.game = new Component(this.node, 'div', 'game');
    const header = new Component(this.game.node, 'h2', 'heading', 'Статистика')
    let countRight = 0
    let countWrong = 0

    const resultTable = new Component(this.game.node, 'table', '', '')
    this.resultTr = new Component(resultTable.node, 'tr', '', '')
    const resultTdAnswer = new Component(this.resultTr.node, 'td', '', 'Ответ')
    const resultTdTranslate = new Component(this.resultTr.node, 'td', '', 'Перевод')

    const aresults = results.map((it) => {
      return it.rightAnswer.translate === it.userAnswer.translate ? it.rightAnswer : it.userAnswer
    })


    results.forEach(i => {
      const voiceRight = new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`)

      if (i.rightAnswer.translate === i.userAnswer.translate) {
        this.resultTr = new Component(resultTable.node, 'tr', 'rightAnswer', '')
        new Component(this.resultTr.node, 'td', '', `${i.rightAnswer.translate}`)
        new Component(this.resultTr.node, 'td', '', `${i.rightAnswer.word}`)
        const voiceRightAnswer = new Component(this.resultTr.node, 'td', 'voice', '')
        voiceRightAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`).play();
        }
        voiceRightAnswer.node.append(voiceRight)
        new Component(this.resultTr.node, 'td', '', 'Знаю')
        countRight++

      }
    })

    results.forEach(i => {
      const voiceWrong = new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`)


      if (i.rightAnswer.translate !== i.userAnswer.translate) {
        this.resultTr = new Component(resultTable.node, 'tr', 'falseAnswer', '')
        new Component(this.resultTr.node, 'td', '', `${i.userAnswer.translate}`)
        new Component(this.resultTr.node, 'td', '', `${i.userAnswer.word}`)
        const voiceWrongAnswer = new Component(this.resultTr.node, 'td', 'voice', '')
        voiceWrongAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`).play();
        }
        voiceWrongAnswer.node.append(voiceWrong)
        new Component(this.resultTr.node, 'td', '', 'Не знаю')
        countWrong++
      }
    })
    const countRightComponent = new Component(this.game.node, 'div', 'count-right', `${countRight}`);
    const countWrongComponent = new Component(this.game.node, 'div', 'count-Wrong', `${countWrong}`);

    const categoriesButton = new Component(this.node, 'button', 'category-button', 'К выбору категории')
    categoriesButton.node.onclick = () => this.onCategories('categories')
  }
}
export default GameOverPage;
