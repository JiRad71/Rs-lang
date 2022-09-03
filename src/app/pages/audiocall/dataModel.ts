import { URL, IUsersAnswer, IWordsData, IUserWordsData, IUserStat, ICreateUserWord, IAggregatedWords } from '../../../asset/utils/types'
import { Request } from '../../../asset/utils/requests'


export interface IQuestionData {
  answers: Ianswers[];
  correctAnswerIndex: number;
  voiceUrl: string;
}

export interface Ianswers {
  word: string;
  translate: string;
  voice: string;
}

export class DataModel {
  data: Array<IWordsData>
  dataRes: IWordsData[];
  request: Request
  dataHard: IAggregatedWords[];
  varWords: Array<IWordsData>;
  constructor() {
    this.data
    this.request = new Request();
    console.log(this.data);

  }

  public getQuestions() {
    const result: IQuestionData[] = []

    for (let i = 0; i < 10; i++) {
      const answers: Array<Ianswers> = []
      const answersCount = 4
      const correctAnswerIndex = Math.floor(Math.random() * answersCount)
      const correctAnswer1 = this.dataRes[Math.floor(Math.random() * this.dataRes.length)]
      console.log(this.dataRes);

      const correctAnswer = {
        word: correctAnswer1.word,
        translate: correctAnswer1.wordTranslate,
        voice: correctAnswer1.audio
      }

      for (let j = 0; j < answersCount; j++) {

        if (correctAnswerIndex == j) {
          answers.push(correctAnswer)
        } else {
          const variantWord1 = this.dataRes[Math.floor(Math.random() * this.dataRes.length)]
          const variantWord = {
            word: variantWord1.word,
            translate: variantWord1.wordTranslate,
            voice: variantWord1.audio
          }
          if (!answers.includes(variantWord)) {
            answers.push(variantWord)
          }
        }
      }

      const question: IQuestionData = {
        voiceUrl: correctAnswer1.audio,
        answers: answers,
        correctAnswerIndex: correctAnswerIndex
      }
      result.push(question)
    }
    return result
  }

  public getQuestionsHard() {
    const result: IQuestionData[] = []

    for (let i = 0; i < 10; i++) {
      const answers: Array<Ianswers> = []
      const answersCount = 4
      const correctAnswerIndex = Math.floor(Math.random() * answersCount)
      const correctAnswer1 = this.dataHard[0].paginatedResults[Math.floor(Math.random() * this.dataHard[0].paginatedResults.length)]

      const correctAnswer = {
        word: correctAnswer1.word,
        translate: correctAnswer1.wordTranslate,
        voice: correctAnswer1.audio
      }

      for (let j = 0; j < answersCount; j++) {
        console.log(this.varWords, 'asd');

        if (correctAnswerIndex == j) {
          answers.push(correctAnswer)
        } else {
          const variantWord1 = this.varWords[Math.floor(Math.random() * this.varWords.length)]

          const variantWord = {
            word: variantWord1.word,
            translate: variantWord1.wordTranslate,
            voice: variantWord1.audio
          }
          if (!answers.includes(variantWord)) {
            answers.push(variantWord)
          }
        }
      }

      const question: IQuestionData = {
        voiceUrl: correctAnswer1.audio,
        answers: answers,
        correctAnswerIndex: correctAnswerIndex
      }
      result.push(question)
    }
    return result
  }

  public async build(url: string[] | string) {
    this.dataRes = []
    for (let i = 0; i < 30; i++) {
      this.data = await this.getWord(url[i])

      this.dataRes = this.dataRes.concat(this.data)
    }
    return this
  }

  private getWord(url: string) {
    return fetch(url).then(res => res.json())
  }

  public async buildHard() {
    this.dataHard = await this.aggregatedWords()
    const resUrl = []
    for (let i = 0; i < 30; i++) {
      resUrl.push(`${URL.url}${URL.group}${localStorage.getItem('currChapter')}${URL.page}${i}`)
    }
    this.varWords = await (await this.build(resUrl)).dataRes
    return [this.dataHard, this.varWords]
  }

  async aggregatedWords() {
    const resp = await fetch(
      `${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.aggregatedWords}?${URL.page}${0}&${URL.wordPerPage}&${URL.filter}${encodeURIComponent(`{"userWord.difficulty":"hard"}`)}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return resp.json();
  }

}