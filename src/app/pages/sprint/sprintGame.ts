import './sprint.css';
import Component from '../../../common/Component';
import StartGame from './startGame';
import GameField from './gameField';
import FinishGame from './finishGame';
import { random } from './gameText';
import { IWordsData } from './interfaces';
import Question from './question';


enum URL {
  url = 'https://rss-lang-backends.herokuapp.com/words/',
  page = '&page=',
  group = '?group='
}

interface IUsersAnswer {
  question: string,
  rightAnswer: string,
  translate: string,
  usersAnswer: boolean,
  result: boolean,
}

class SprintGame extends Component {
  answers: IUsersAnswer[];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sprint-game');
    this.answers = [];
    this.mainUpdate()
  }

  private mainUpdate() {
    const startPage = new StartGame(this.node);
    startPage.onStart = (index: number) => {
      startPage.destroy();
      this.getWords(index)
        .then((data: IWordsData[]) => {
          const quest = data[random(0, 19)];
          const falseAnswer = data[random(0, 19)];
          return [quest, falseAnswer];
        })
        .then((content) => {
          this.startGame(index, content);
        });
      
    }
  }

  private startGame(index: number, data: IWordsData[]) {
    const gameField = new GameField(this.node, data);
    this.gameCycle(gameField, data, index);

    const timer = setTimeout(() => {
      gameField.destroy();
      const finish = new FinishGame(this.node);
      finish.render(this.answers);
  
      finish.nextGame = () => {
        finish.destroy();
        this.startGame(index, data);
      }
      finish.onClose = () => {
        finish.destroy();
        this.mainUpdate();
      }
    }, 60000)

    gameField.onClose = () => {
      gameField.destroy();
      clearTimeout(timer);
      this.mainUpdate();
    }
  }

  private gameCycle(gameField: GameField, data: IWordsData[], index: number) {
    const question = new Question(gameField.node, data);

    question.onAnswer = (answer: boolean) => {
      const statData: IUsersAnswer = {
        question: question.data[0].word,
        rightAnswer: question.data[0].wordTranslate,
        translate: question.data[1].wordTranslate,
        usersAnswer: answer,
        result: !true,
      };
      
      if (answer && question.answer === question.translate) {
        statData.result = true;
      }
      if (!answer && question.answer !== question.translate) {
        statData.result = true;
      }
      this.answers.push(statData);
      question.destroy();
      this.getWords(index)
        .then((data: IWordsData[]) => {
          const quest = data[random(0, 19)];
          const falseAnswer = data[random(0, 19)];
          return [quest, falseAnswer];
        })
        .then((content) => {
          this.gameCycle(gameField, content, index);
        });
    }
  }

  async getWords(index: number) {
    const resp = await fetch(`${URL.url}${URL.group}${index}${URL.page}${random(0, 29)}`);
    return resp.json();
  }

  // private getQuestion(index: number) {
   
  // }
}

export default SprintGame;
