import Component from "../../../common/Component";
import QuestionView from "./questionView";
import { IQuestionData, Ianswers } from "./dataModel";

type IGameResults = {
  rightAnswer: Ianswers;
  userAnswer: Ianswers
}[]

class GameFildPage extends Component {
  onBack: () => void;
  onFinish: (result: IGameResults) => void
  progressIndicator: Component<HTMLElement>;
  results: IGameResults;
  answersIndicator: Component<HTMLElement>;
  game: Component<HTMLElement>;

  constructor(parentNode: HTMLElement, categoryIndex: number, questionsData: Array<IQuestionData>) {
    super(parentNode);

    this.game = new Component(this.node, 'div', 'game');

    const header = new Component(this.game.node, 'h2', 'heading', `Сложность игры ${categoryIndex + 1}`)

    const backButton = new Component(this.node, 'button', 'category-button', 'К выбору категории')
    backButton.node.onclick = () => this.onBack();

    this.progressIndicator = new Component(this.game.node, 'p', 'progress-indicator', '')
    this.answersIndicator = new Component(this.game.node, 'div', 'answers-indicator', '')

    this.results = []
    this.questionCycle(questionsData, 0, () => {
      this.onFinish(this.results);
    })
  }

  questionCycle(questions: Array<IQuestionData>, index: number, onFinish: () => void) {
    if (index >= questions.length) {
      onFinish()
      return
    }
    this.progressIndicator.node.textContent = `${index + 1} слово из ${questions.length}`
    this.answersIndicator.node.innerHTML = this.results.map((it) => {
      return it.rightAnswer.translate === it.userAnswer.translate ? `<span class="right-answer"></span>` : `<span class="false-answer"></span>`
    }).join(' ')

    const question = new QuestionView(this.node, questions[index])
    question.onAnswer = answerIndex => {
      question.destroy()

      this.results.push({
        rightAnswer: {
          word: questions[index].answers[questions[index].correctAnswerIndex].word,
          translate: questions[index].answers[questions[index].correctAnswerIndex].translate,
          voice: questions[index].answers[questions[index].correctAnswerIndex].voice
        },
        userAnswer: {
          word: questions[index].answers[answerIndex].word,
          translate: questions[index].answers[answerIndex].translate,
          voice: questions[index].answers[answerIndex].voice
        }
      })
      this.questionCycle(questions, index + 1, onFinish)
    }
  }
}
export default GameFildPage;
