import { IWordsData } from '../../../asset/utils/types'

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
  data1: Array<IWordsData>;
  data2: Array<IWordsData>;
  data3: Array<IWordsData>;
  dataRes: IWordsData[];
  constructor() {
    this.data
  }

  public getQuestions() {
    const result: IQuestionData[] = []

    for (let i = 0; i < 10; i++) {
      const answers: Array<Ianswers> = []
      const answersCount = 4
      const correctAnswerIndex = Math.floor(Math.random() * answersCount)
      const correctAnswer = {
        word: this.dataRes[i].word,
        translate: this.dataRes[i].wordTranslate,
        voice: this.dataRes[i].audio
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
        voiceUrl: this.dataRes[i].audio,
        answers: answers,
        correctAnswerIndex: correctAnswerIndex
      }
      result.push(question)
    }
    return result
  }

  public async build(...url: string[]) {
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
}