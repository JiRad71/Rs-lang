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
  constructor() {
    this.data
  }

  public getQuestions() {
    const result: IQuestionData[] = []
    // console.log(this.data);
    // console.log(this.data1);
    // console.log(this.data2);
    // console.log(this.data3);

    for (let i = 0; i < 10; i++) {
      const answers: Array<Ianswers> = []
      const answersCount = 4
      const correctAnswerIndex = Math.floor(Math.random() * answersCount)
      const correctAnswer = {
        word: this.data[i].word,
        translate: this.data[i].wordTranslate,
        voice: this.data[i].audio
      }
      const answer1 = {
        word: this.data1[i].word,
        translate: this.data1[i].wordTranslate,
        voice: this.data1[i].audio
      }
      const answer2 = {
        word: this.data2[i].word,
        translate: this.data2[i].wordTranslate,
        voice: this.data2[i].audio
      }

      for (let j = 0; j < answersCount; j++) {

        if (correctAnswerIndex == j) {
          answers.push(correctAnswer)
        } else {
          const variantWord1 = this.data1[Math.floor(Math.random() * this.data1.length)]
          const variantWord = {
            word: variantWord1.word,
            translate: variantWord1.wordTranslate,
            voice: variantWord1.audio
          }
          // if (!answers[i].translate.includes(variantWord.translate)) {
          answers.push(variantWord)
          // }
        }
      }
      const variantWord2 = this.data2[Math.floor(Math.random() * this.data2.length)]
      const variantWord3 = {
        word: variantWord2.word,
        translate: variantWord2.wordTranslate,
        voice: variantWord2.audio
      }

      if (answers.length < 4) answers.push(variantWord3)
      const question: IQuestionData = {
        voiceUrl: this.data[i].audio,
        answers: answers,
        correctAnswerIndex: correctAnswerIndex
      }
      result.push(question)
    }
    return result
  }

  public async build(url: string, url1: string, url2: string) {
    this.data = await this.getWord(url)
    this.data1 = await this.getWord(url1)
    this.data2 = await this.getWord(url2)
    return this
  }

  private getWord(url: string) {
    return fetch(url).then(res => res.json())
  }
}