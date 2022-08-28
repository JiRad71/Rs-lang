import './sprint.css';
import Component from '../../../common/Component';
import StartGame from './startGame';
import GameField from './gameField';
import FinishGame from './finishGame';
import { random } from './gameText';
import Question from './question';
import AnswersHandler from './answersHandler';
import { URL, IUsersAnswer, IWordsData, IUserWordsData} from '../../../asset/utils/types';

class SprintGame extends Component {
  answersHandler: AnswersHandler;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sprint-game');
    this.mainUpdate()
  }

  private mainUpdate() {
    const startPage = new StartGame(this.node);
    startPage.onStart = (index: number) => {
      startPage.destroy();
      this.getData(index).then((data) => this.startGame(data, index))
    }
  }

  private startGame(data: IWordsData[], index?: number) {
    const gameField = new GameField(this.node, data);
    this.answersHandler = new AnswersHandler(gameField);
    this.gameCycle(gameField, data, index);

    const timer = setTimeout(() => {
      gameField.destroy();
      const finish = new FinishGame(this.node, gameField.score.node.textContent);
      finish.render(this.answersHandler.answers);
      this.answersHandler.clear();
  
      finish.nextGame = () => {
        finish.destroy();
        this.startGame(data, index);
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

  private gameCycle(gameField: GameField, data: IWordsData[], index?: number) {
    const question = new Question(gameField.node, data);

    question.onAnswer = (answer: boolean) => {
      const statData: IUsersAnswer = {
        question: question.data[0].word,
        rightAnswer: question.data[0].wordTranslate,
        translate: question.translate,
        usersAnswer: answer ? 'Верно' : 'Не верно',
        result: !true,
      };

      this.answersHandler.handle(statData, question);
      question.destroy();
      this.getData(index).then((data) => this.gameCycle(gameField, data, index));
    }
  }

  private async getData(index?: number) {
    try {
      if (index && index !== 6) {
        const resp = await this.getWords(index);
        const quest = resp[random(0, 19)];
        const falseAnswer = resp[random(0, 19)];
        return [quest, falseAnswer];
      }
      const resp = await this.getUserWords();
      const quest = await resp[random(0, resp.length - 1)];
      const falseAnswer = await resp[random(0, resp.length - 1)];
      return  [quest, falseAnswer];
    } catch (error) {
      console.log(error.message, 'Возможно список сложных слов пуст')
    }
  }

  async getWords(index: number): Promise<IWordsData[]> {
    const resp = await fetch(`${URL.url}${URL.group}${index}${URL.page}${random(0, 29)}`);
    return resp.json();
  }

  async getUserWordsData() {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.words}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return resp.json();
  }

  async getUserWords() {
    const listUserWords: IUserWordsData[] = await this.getUserWordsData();
    const listWords: Promise<IWordsData>[] = listUserWords.map(async (word) => {
      const resp = await fetch(`${URL.shortUrl}${URL.words}/${word.wordId}`)
      return resp.json();
    });
    const listDataWords = listWords.map(async (word) => await word);
    return listDataWords;
  }
}

export default SprintGame;
