import '../../../styles/sprint.css';
import Component from '../../../common/Component';
import StartGame from './startGame';
import GameField from './gameField';
import FinishGame from './finishGame';
import { random } from '../../../asset/utils/usefull';
import Question from './question';
import AnswersHandler from './answersHandler';
import { Request } from '../../../asset/utils/requests';
import { URL, IUsersAnswer, IWordsData, IUserWordsData, IUserStat, ICreateUserWord} from '../../../asset/utils/types';

class SprintGame extends Component {
  answersHandler: AnswersHandler;
  question: Question;
  chapter: string;
  page: string;
  counter: number;
  request: Request;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sprint-game');
    this.counter = 0;
    this.request = new Request();
    this.chapter = localStorage.getItem('currChapter');
    this.page = localStorage.getItem('currPage');
    if (this.chapter) {
      this.mainUpdate(this.chapter, this.page);
    } else {
      this.mainUpdate();
    }
  }

  mainUpdate(chapter?: string, page?: string) {
    if (chapter) {
      this.getData(+chapter, true).then((data) => {
        this.startGame(data, +chapter, page);
      })
    } else {
      const startPage = new StartGame(this.node);
      startPage.onStart = (index: number) => {
        startPage.destroy();
        this.getData(index).then((data) => {
          this.startGame(data, index)
        })
      }
    }
  }

  startGame(data: IWordsData[], index?: number, page?: string) {
    const gameField = new GameField(this.node, data);
    this.answersHandler = new AnswersHandler(gameField);
    gameField.timer.onFinish = () => {
      gameField.timer.off();
      gameField.destroy();
      const finish = new FinishGame(this.node, gameField.score.node.textContent);
      finish.render(this.answersHandler.answers);
      this.getLearnedWord().then((data: IUserStat) => {
        const count = this.answersHandler.getLearnWord().length + data.learnedWords;
        this.putLearnedWord({learnedWords: count});
        this.answersHandler.clear();
        this.counter = 0;
      })
        .catch(() => console.log('Вы не авторизованы'));
      
      finish.nextGame = () => {
        finish.destroy();
        this.startGame(data, index);
      }
      finish.onClose = () => {
        finish.destroy();
        this.mainUpdate();
      }
    }
    gameField.onClose = () => {
      gameField.destroy();
      this.mainUpdate();
    }
    this.gameCycle(gameField, data, index, page);

  }

  gameCycle(gameField: GameField, data: IWordsData[], index?: number, page?: string) {
    const question = new Question(gameField.node, data);
    document.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        this.toHandle(true, question);
        if (this.counter >= 19) this.endGame(gameField);
        this.isTextbook(gameField, index, page);
        
      } else if (e.key === 'ArrowRight') {
        this.toHandle(false, question);
        if (this.counter >= 19) this.endGame(gameField);
        this.isTextbook(gameField, index, page);
      }
    };

    question.onAnswer = (answer: boolean) => {
      this.toHandle(answer, question);
      if (this.counter >= 19) this.endGame(gameField);
      this.isTextbook(gameField, index, page);
    }
  }

  endGame(gameField: GameField) {
    gameField.timer.off();
    gameField.destroy();
    const finish = new FinishGame(this.node, gameField.score.node.textContent);
    finish.render(this.answersHandler.answers);
    finish.btnRestart.destroy();
    this.getLearnedWord().then((data: IUserStat) => {
      const count = this.answersHandler.getLearnWord().length + data.learnedWords;
      // this.putLearnedWord({learnedWords: count, optional: {}});
      const right = this.updateUserWords(this.answersHandler.rightAnswers);
      const fail = this.updateUserWords(this.answersHandler.failAnswers);
      Promise.all([right, fail]).then(() => this.saveResults(this.answersHandler.answers.length, this.answersHandler.rightAnswers.length))
        .then(() => this.answersHandler.clear());
      this.counter = 0;
    })
      .catch(() => console.log('Вы не авторизованы'));
  
    finish.onClose = () => {
      finish.destroy();
      location.hash = 'textbook';
    }
  }

  saveResults(countAnswer: number, countRightAnswer: number) {
    this.request.getStatistic().then((data: IUserStat) => {
      const count = countRightAnswer + data.learnedWords;
      console.log(this.answersHandler.newWords);
      console.log( data.optional.newWords);
      
      if (new Date().toLocaleDateString() === data.optional.date) {
        this.request.putStatistic({
          learnedWords: count,
          optional: {
            date: new Date().toLocaleDateString(),
            rightAnswers: data.optional.sprint.rightAnswers ?
            (data.optional.sprint.rightAnswers + Math.floor(100 / (countAnswer / countRightAnswer))) / 2
            : Math.floor(100 / (countAnswer / countRightAnswer)),
            newWords: data.optional.newWords + this.answersHandler.newWords,
            sprint: {
              newWords: data.optional.sprint.newWords ? this.answersHandler.newWords + data.optional.sprint.newWords : this.answersHandler.newWords,
              rightAnswers: data.optional.sprint.rightAnswers ?
                (data.optional.sprint.rightAnswers + Math.floor(100 / (countAnswer / countRightAnswer))) / 2
                : Math.floor(100 / (countAnswer / countRightAnswer)),
              series: this.checkBestSeries(data.optional.sprint.series, this.answersHandler.getBestSeries()),
            }
          }
        });
      } else {
        this.request.putStatistic({
          learnedWords: count,
          optional: {
            date: new Date().toLocaleDateString(),
            rightAnswers: countAnswer,
            sprint: {
              newWords: this.answersHandler.newWords,
              rightAnswers: Math.floor(100 / (countAnswer / countRightAnswer)),
              series: this.answersHandler.getBestSeries(),
            }
          }
        });
      }
      
    })
  }

  checkBestSeries(series: number, newSeries: number) {
    return series > newSeries ? series : newSeries;
  }

  toHandle(answer: boolean, question: Question) {
    const statData = this.getStatData(answer, question);
    this.answersHandler.handle(statData, question);
    question.destroy();
  }

  isTextbook(gameField: GameField, index?: number, page?: string) {
    if (page) {
      this.getData(index, true).then((data) => this.gameCycle(gameField, data, index, page));
    } else {
      this.getData(index).then((data) => this.gameCycle(gameField, data, index));
    }
  }

  getStatData(answer: boolean, question: Question) {
    const statData: IUsersAnswer = {
      id: question.data[0].id,
      group: question.data[0].group,
      page: question.data[0].page,
      question: question.data[0].word,
      rightAnswer: question.data[0].wordTranslate,
      translate: question.translate,
      usersAnswer: answer ? 'Верно' : 'Не верно',
      result: !true,
    };
   return statData;
  }

  private async getData(index?: number, textbook?: boolean) {
    try {
      if (textbook) {
        const resp = await this.getWords(+this.chapter, this.page);
        const quest = resp[this.counter];
        const falseAnswer = resp[random(0, 19)];
        this.counter += 1;
        return [quest, falseAnswer];
      } else if ((index && index !== 6) || index === 0) {
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
      console.log('Возможно список сложных слов пуст')
    }
  }

  async updateUserWords(data: IUsersAnswer[]) {
    const userWords: IUserWordsData[] = await this.getUserWordsData();
    
    if (data[0].result) {
      for (let i = 0; i < data.length; i += 1) {
        const word = userWords.find((e) => e.wordId === data[i].id);
        if (word) {
          word.difficulty = 'easy';
          word.optional.rightAnswer += 1;
          word.optional.used = true;
          this.createUserWord(word.wordId, {difficulty: word.difficulty, optional: word.optional}, 'PUT');
        } else {
          const update: ICreateUserWord = {difficulty: 'normal'};
          update.optional = {rightAnswer: 1, falseAnswer: 0, used: true};
          this.answersHandler.newWords += 1;
          this.createUserWord(data[i].id, update, 'POST');
        }
      }
    } else {
      for (let i = 0; i < data.length; i += 1) {
        const word = userWords.find((e) => e.wordId === data[i].id);
        if (word) {
          word.optional.falseAnswer += 1;
          word.optional.used = true;
          word.difficulty = +word.optional.falseAnswer > +word.optional.rightAnswer ? 'hard' : 'normal';
          this.createUserWord(word.wordId, {difficulty: word.difficulty, optional: word.optional}, 'PUT');
        } else {
          const update: ICreateUserWord = {difficulty: 'normal'};
          this.answersHandler.newWords += 1;
          update.optional = {rightAnswer: 0, falseAnswer: 1, used: true};
          this.createUserWord(data[i].id, update, 'POST');
        }
      }
    }
  }

  async getWords(index: number, page?: string): Promise<IWordsData[]> {
    const param = !page ? random(0, 29): page;
    const resp = await fetch(`${URL.url}${URL.group}${index}${URL.page}${param}`);
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

  async getLearnedWord() {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.stat}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return resp.json();
  }

  async putLearnedWord(data: IUserStat) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.stat}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return resp.json();
  }

  async createUserWord(id: string, data: ICreateUserWord, method: string) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.words}/${id}`, {
      method: method,
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return resp.json();
  }
}

export default SprintGame;
