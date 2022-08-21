import Component from '../../../common/Component';
import StartGame from './startGame';
import GameField from './gameField';
import FinishGame from './finishGame';
import { random } from './gameText';
import { IWordsData } from './interfaces';
import Question from './question';


class SprintGame extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sprint-game');
    this.mainUpdate()
  }

  private mainUpdate() {
    const startPage = new StartGame(this.node);
    startPage.onStart = (index: number) => {
      startPage.destroy();
      this.getWords(index)
        .then((data) => data.map((word: IWordsData) => word.word))
        .then((data) => {
          this.startGame(index, data);
        });
      
    }
  }

  private startGame(index: number, data: IWordsData[]) {
    const gameField = new GameField(this.node, data);
    this.gameCycle(gameField, data);

    const timer = setTimeout(() => {
      gameField.destroy();
      const finish = new FinishGame(this.node);
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

  private gameCycle(gameField: GameField, data: IWordsData[], indexData = 0) {
    if (indexData >= data.length) {
      console.log('слова закончились');
    }
    const question = new Question(gameField.node, data[indexData])
    question.onAnswer = (answer: boolean) => {
      question.destroy();
      indexData += 1;
      // if (answer) {

      // }

      
      this.gameCycle(gameField, data, indexData);
    }
  }

  async getWords(index: number) {
    const resp = await fetch(`https://rss-lang-backends.herokuapp.com/words/?page=${random(0, 29)}&group=${index}`);
    return resp.json();
  }
}

export default SprintGame;
