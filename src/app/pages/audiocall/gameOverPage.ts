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

  constructor(parentNode: HTMLElement, results: IGameResults) {
    super(parentNode);

    const resultIndicator = new Component(this.node, 'div', '', '')

    const resultTable = new Component(this.node, 'table', '', '')
    this.resultTr = new Component(resultTable.node, 'tr', '', '')
    const resultTdAnswer = new Component(this.resultTr.node, 'td', '', 'Ответ')
    const resultTdTranslate = new Component(this.resultTr.node, 'td', '', 'Перевод')

    const aresults = results.map((it) => {
      return it.rightAnswer.translate === it.userAnswer.translate ? it.rightAnswer : it.userAnswer
    })



    results.forEach(i => {
      // const voice = new Audio(`https://rss-lang-backends.herokuapp.com/${i.voice}`).play()
      if (i.rightAnswer.translate === i.userAnswer.translate) {
        this.resultTr = new Component(resultTable.node, 'tr', 'rightAnswer', '')
        new Component(this.resultTr.node, 'td', '', `${i.rightAnswer.translate}`)
        new Component(this.resultTr.node, 'td', '', `${i.rightAnswer.word}`)
      } else {
        this.resultTr = new Component(resultTable.node, 'tr', 'falseAnswer', '')
        new Component(this.resultTr.node, 'td', '', `${i.userAnswer.translate}`)
        new Component(this.resultTr.node, 'td', '', `${i.userAnswer.word}`)
      }

    })

    console.log(aresults);


    resultIndicator.node.textContent = results.map((it) => {
      return it.rightAnswer.translate === it.userAnswer.translate ? it.rightAnswer.translate : it.userAnswer.translate
    }).join(' ')

    // const nextButton = new Component(this.node, 'button', '', 'next')
    // nextButton.node.onclick = () => this.onNext();

    const categoriesButton = new Component(this.node, 'button', '', 'categorises')
    categoriesButton.node.onclick = () => this.onCategories('categories')
  }
}
export default GameOverPage;
