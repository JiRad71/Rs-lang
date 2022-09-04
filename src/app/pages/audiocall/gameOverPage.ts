import Component from "../../../common/Component";
import { IQuestionData, Ianswers } from "./dataModel";
import { Request } from '../../../asset/utils/requests';
import { URL, IUsersAnswer, IWordsData, IUserWordsData, IUserStat, ICreateUserWord, IUserWordsDataCastom } from '../../../asset/utils/types';
import Adapter from "../../../asset/utils/adapter";



type IGameResults = {
  rightAnswer: Ianswers;
  userAnswer: Ianswers
}[]

class GameOverPage extends Component {
  onNext: () => void;
  onCategories: (categories: string) => void
  resultList: Component<HTMLElement>;
  resultRight: Component<HTMLElement>;
  game: Component<HTMLElement>;
  resultWrong: Component<HTMLElement>;
  resultRightItem: Component<HTMLElement>;
  resultWrongItem: Component<HTMLElement>;
  countRight: number
  countWrong: number
  request: Request;
  countAnswer: number;
  seriesList: number[];
  series: number;
  results: IGameResults;
  adapter: Adapter;
  newWords: number;



  constructor(parentNode: HTMLElement, results: IGameResults) {
    super(parentNode);
    this.game = new Component(this.node, 'div', 'game');
    const header = new Component(this.game.node, 'h2', 'heading', 'Статистика')
    this.countRight = 0
    this.countWrong = 0
    this.countAnswer = 10
    this.seriesList = [];
    this.series = 0
    this.request = new Request();
    this.results = results;
    this.adapter = new Adapter();
    this.newWords = 0;

    const resultList = new Component(this.game.node, 'div', 'result-list', '')
    this.resultRight = new Component(resultList.node, 'div', 'result-right', '')
    const headerRight = new Component(this.resultRight.node, 'h3', 'heading', 'Правильные ответы')

    
    console.log(results);
    

    results.forEach(i => {
      const voiceRight = new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`)

      if (i.rightAnswer.translate === i.userAnswer.translate) {
        this.updateUserWords(this.results, 'easy', 1, 0);
        this.resultRightItem = new Component(this.resultRight.node, 'p', 'rightAnswer', '')
        const voiceRightAnswer = new Component(this.resultRightItem.node, 'span', 'voice-stat', '')
        voiceRightAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`).play();
        }
        voiceRightAnswer.node.append(voiceRight)
        new Component(this.resultRightItem.node, 'span', '', ` ${i.rightAnswer.translate} - `)
        new Component(this.resultRightItem.node, 'span', '', `${i.rightAnswer.word}`)
        this.countRight++
      }
    })
    const countRightComponent = new Component(this.resultRight.node, 'div', 'count-right', 'Знаю всего: ');
    const countRightComponentNumber = new Component(countRightComponent.node, 'span', 'count-right-number', `${this.countRight}`);

    this.resultWrong = new Component(resultList.node, 'div', '', '')
    const headerWrong = new Component(this.resultWrong.node, 'h3', 'heading', 'Ошибочные ответы')

    results.forEach(i => {
      const voiceWrong = new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`)

      if (i.rightAnswer.translate !== i.userAnswer.translate) {
        this.updateUserWords(this.results, 'hard', 0, 1);
        this.resultWrongItem = new Component(this.resultWrong.node, 'p', 'falseAnswer', '')
        const voiceWrongAnswer = new Component(this.resultWrongItem.node, 'span', 'voice-stat', '')
        voiceWrongAnswer.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${i.userAnswer.voice}`).play();
        }
        voiceWrongAnswer.node.append(voiceWrong)
        new Component(this.resultWrongItem.node, 'span', '', ` ${i.userAnswer.translate} - `)
        new Component(this.resultWrongItem.node, 'span', '', `${i.userAnswer.word}`)
        this.countWrong++
      }
    })
    const countWrongComponent = new Component(this.resultWrong.node, 'p', 'count-wrong', 'Ошибок всего: ');
    const countWrongComponentNumber = new Component(countWrongComponent.node, 'span', 'count-wrong-number', `${this.countWrong}`);

    const categoriesButton = new Component(this.node, 'button', 'category-button', 'К выбору категории')
    categoriesButton.node.onclick = () => this.onCategories('categories')
    this.saveResults(this.countAnswer, this.countRight)

    results.forEach(i => {
      const voiceRight = new Audio(`https://rss-lang-backends.herokuapp.com/${i.rightAnswer.voice}`)

      if (i.rightAnswer.translate === i.userAnswer.translate) {
        this.series += 1
      } else {
        this.seriesList.push(this.series);
        this.series = 0;
      }
    })
  }

  checkBestSeries(series: number, newSeries: number) {
    return series > newSeries ? series : newSeries;
  }

  getBestSeries() {
    const sort = this.seriesList.sort((a, b) => a - b);
    return sort[sort.length - 1];
  }

  async updateUserWords(data: IGameResults, difficulty: string, increese: number, less: number) {
    const userWords: IUserWordsDataCastom[] = await this.request.getUserWordsData();
    // data.forEach((e) => console.log(e.rightAnswer.wordId, e.rightAnswer.translate));
    const check = userWords.some((e) => e.wordId);

    for (let i = 0; i < data.length; i += 1) {
      const word = userWords.find((e) => e.wordId === data[i].rightAnswer.wordId);
      if (check && word.optional.sprint.used) {
        const newData = {
          game: 'audioCall',
          wordId: word.wordId,
          difficulty,
          rightAnswer: word.optional.audioCall.rightAnswer += increese,
          falseAnswer: word.optional.sprint.falseAnswer += less,
          used: true,
          method: 'PUT',
        }
        this.adapter.add(newData);
      } else {
        const newData = {
          game: 'audioCall',
          wordId: data[i].rightAnswer.wordId,
          difficulty,
          rightAnswer: increese,
          falseAnswer: less,
          used: true,
          method: 'POST',
        };
        this.adapter.add(newData);
        this.newWords += 1;
      }
    }
   
    return data;
  }

  saveResults(countAnswer: number, countRight: number) {
    this.request.getStatistic().then((data: IUserStat) => {
      const count = countRight + data.learnedWords;
      console.log(data);

      if (new Date().toLocaleDateString() === data.optional.date) {
        this.request.putStatistic({
          learnedWords: count,
          optional: {
            date: new Date().toLocaleDateString(),
            rightAnswers: data.optional.audioCall.rightAnswers ?
              (data.optional.audioCall.rightAnswers + Math.floor(100 / (countAnswer / countRight))) / 2
              : Math.floor(100 / (countAnswer / countRight)),
            newWords: data.optional.newWords + data.optional.audioCall.newWords,
            sprint: {
              newWords: data.optional.sprint.newWords,
              rightAnswers: data.optional.sprint.rightAnswers,
              series: data.optional.sprint.series,
            },
            audioCall: {
              newWords: data.optional.audioCall.newWords,
              rightAnswers: data.optional.audioCall.rightAnswers ?
                (data.optional.audioCall.rightAnswers + Math.floor(100 / (countAnswer / countRight))) / 2
                : Math.floor(100 / (countAnswer / countRight)),
              series: this.checkBestSeries(data.optional.sprint.series, this.getBestSeries()),
            }
          }
        });
      } else {
        this.request.putStatistic({
          learnedWords: count,
          optional: {
            date: new Date().toLocaleDateString(),
            rightAnswers: countAnswer,
            newWords: data.optional.audioCall.newWords,
            audioCall: {
              newWords: this.newWords,
              rightAnswers: Math.floor(100 / (countAnswer / countRight)),
              series: this.getBestSeries(),
            },
            sprint: {
              newWords: 0,
              rightAnswers: 0,
              series: 0,
            },
          }
        });
      }

    })
  }
}
export default GameOverPage;
