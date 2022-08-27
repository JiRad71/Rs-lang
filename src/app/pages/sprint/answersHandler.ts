import GameField from './gameField';
import Question from './question';

interface IUsersAnswer {
  question: string,
  rightAnswer: string,
  translate: string,
  usersAnswer: string,
  result: boolean,
}

class AnswersHandler {
  answers: IUsersAnswer[];
  gameField: GameField;
  scale: number;

  constructor(gameField: GameField) {
    this.gameField = gameField;
    this.answers = [];
    this.scale = 10;
  }

  addAnswer(data: IUsersAnswer) {
    this.answers.push(data);
  }

  clear() {
    this.answers = [];
  }

  handle(data: IUsersAnswer, question: Question) {
    if ((data.usersAnswer === 'Верно' && question.answer === question.translate)
    || (data.usersAnswer === 'Не верно' && question.answer !== question.translate)) {
      data.result = true;

      const score = this.gameField.score.node.textContent;
      this.gameField.score.node.textContent = `${+score + this.scale}`;

      if (!this.gameField.circles[0].node.classList.contains('passed')) {
        this.gameField.circles[0].node.classList.add('passed');

      } else if (this.gameField.circles[0].node.classList.contains('passed')) {
        this.gameField.circles[1].node.classList.add('passed');

      } else if (this.gameField.circles[1].node.classList.contains('passed')) {
        this.gameField.circles[2].node.classList.add('passed');

      } else if (this.gameField.circles[2].node.classList.contains('passed')) {
        this.gameField.circles[3].node.classList.add('passed');

      } else if (this.gameField.circles[3].node.classList.contains('passed')) {
        this.gameField.circles.forEach((e) => e.node.classList.remove('passed'));
        this.scale *= 2;
      }

      this.addAnswer(data);
    }

    this.gameField.circles.forEach((e) => e.node.classList.remove('passed'));
    this.addAnswer(data);
  }

}

export default AnswersHandler;
