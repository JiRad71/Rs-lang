import GameField from './gameField';
import Question from './question';
import { IUsersAnswer } from '../../../asset/utils/types';

class AnswersHandler {
  answers: IUsersAnswer[];
  rightAnswers: IUsersAnswer[];
  failAnswers: IUsersAnswer[];
  gameField: GameField;
  scale: number;
  countAnswer = 0;

  constructor(gameField: GameField) {
    this.gameField = gameField;
    this.answers = [];
    this.rightAnswers = [];
    this.failAnswers = [];
    this.scale = 10;
  }

  addAnswer(data: IUsersAnswer, right: boolean) {
    right ? this.rightAnswers.push(data) : this.failAnswers.push(data);

    this.answers.push(data);
  }

  clear() {
    this.answers = [];
    this.rightAnswers = [];
    this.failAnswers = [];
  }

  getLearnWord() {
    return this.rightAnswers;
  }

  getHardWord() {
    return this.failAnswers;
  }

  handle(data: IUsersAnswer, question: Question) {
    if ((data.usersAnswer === 'Верно' && question.answer === question.translate)
    || (data.usersAnswer === 'Не верно' && question.answer !== question.translate)) {
      data.result = true;

      const score = this.gameField.score.node.textContent;
      this.gameField.score.node.textContent = `${+score + this.scale}`;
      this.gameField.scale.node.textContent = `(+${this.scale} за правильный ответ)`;

      if (!this.gameField.circles[0].node.classList.contains('passed')) {
        this.gameField.circles[0].node.classList.add('passed');
        this.countAnswer += 1;

      } else if (this.gameField.circles[0].node.classList.contains('passed')
                && this.countAnswer === 1) {
        this.gameField.circles[1].node.classList.add('passed');
        this.countAnswer += 1;

      } else if (this.gameField.circles[1].node.classList.contains('passed')
                && this.countAnswer === 2) {
        this.gameField.circles[2].node.classList.add('passed');
        this.countAnswer += 1;

      } else if (this.gameField.circles[2].node.classList.contains('passed')
                && this.countAnswer === 3) {
        this.gameField.circles.forEach((e) => e.node.classList.remove('passed'));
        this.scale *= 2;
        this.countAnswer = 0;
      }

      this.addAnswer(data, true);

    } else {
      this.gameField.circles.forEach((e) => e.node.classList.remove('passed'));
      this.scale = 10;
      this.countAnswer = 0;
      this.addAnswer(data, false);
    }
  }

}

export default AnswersHandler;
