import Component from "../../../common/Component";
import { IQuestionData } from "./dataModel";

class QuestionView extends Component {
  onAnswer: (index: number) => void;
  game: Component<HTMLElement>;
  answersButtons: Component<HTMLElement>;
  constructor(parentNode: HTMLElement, questionData: IQuestionData) {
    super(parentNode);

    this.game = new Component(this.node, 'div', 'game', '')


    const question = new Component(this.game.node, 'div', 'voice', '')
    const voice = new Audio(`https://rss-lang-backends.herokuapp.com/${questionData.voiceUrl}`)
    question.node.onclick = () => {
      new Audio(`https://rss-lang-backends.herokuapp.com/${questionData.voiceUrl}`).play();
    }

    question.node.append(voice)

    this.answersButtons = new Component(this.game.node, 'div', 'answers-buttons', '')

    const answerButtons = questionData.answers.map((it, i) => {
      const answerButton = new Component(this.answersButtons.node, 'button', 'answer-button', it.translate)
      answerButton.node.onclick = () => this.onAnswer(i)
    })
  }
}
export default QuestionView;