import MainPage from '../../app/pages/main/mainpage';
import TextBook from '../../app/pages/textBook/textBook';
import AudioCall from '../../app/pages/audioCall/audioCall';
import SprintGame from '../../app/pages/sprint/SprintGame';

export type PageTypes = MainPage | TextBook | AudioCall | SprintGame | void;

export enum URL {
  url = 'https://rss-lang-backends.herokuapp.com/words/',
  shortUrl = 'https://rss-lang-backends.herokuapp.com/',
  page = '&page=',
  group = '?group=',
  signin = 'signin',
  login = 'users',
  words = 'words',
  stat = 'statistics',
  aggregatedWords = 'aggregatedWords',
  wordPerPage = 'wordsPerPage=20',
  filter = 'filter=',
  settings = 'settings',
}

export interface IWordsData {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
  _id: string
}

export interface IAggregatedWords {
  paginatedResults: IWordsData[]
  totalCount: number[]
}

export interface IUserWordsCustom {
  difficulty: string,
  wordId?: string,
  optional?: {
    rightAnswers?: number,
    sprint?: {
      rightAnswer: number,
      falseAnswer: number,
      used: boolean,
    },
    audioCall?: {
      rightAnswer: number,
      falseAnswer: number,
      used: boolean,
    },
  }
}

export interface IUserData {
  email: string,
  password: string,
}

export interface IUsersAnswer {
  id: string,
  group: number,
  page: number,
  question: string,
  rightAnswer: string,
  translate: string,
  usersAnswer: string,
  result: boolean,
  used?: boolean
}

export interface SprintStat {
  rightAnswer: number,
  falseAnswer: number,
  used: boolean,
}

export interface InputData {
  game: string,
  wordId: string,
  difficulty: string,
  rightAnswer: number,
  falseAnswer: number,
  used: boolean,
  method: string,
}

export interface IUserWordsData {
  id?: string,
  difficulty: string,
  wordId: string,
  optional?: ICreateUserWordOption,
}

export interface IUserWordsDataCastom {
  id: string,
  difficulty: string,
  wordId: string,
  optional?: ICastom,
}

export interface ICreateUserWord {
  difficulty: string,
  optional?: ICreateUserWordOption,
}

export interface ICreateUserWordCastom {
  difficulty: string,
  optional?: ICastom,
}

export interface ICreateUserWordOption {
  rightAnswer: number,
  falseAnswer: number,
  used?: boolean,
}

export interface ICastom {
  sprint?: {
    rightAnswer?: number,
    falseAnswer?: number,
    used?: boolean,
  },
  audioCall?: {
    rightAnswer?: number,
    falseAnswer?: number,
    used?: boolean,
  }
}

export interface IUserStat {
  learnedWords: number,
  optional?: {
    date?: string,
    newWords?: number,
    learnedWords?: number,
    rightAnswers?: number,
    sprint?: {
      newWords: number,
      rightAnswers: number,
      series: number,
    },
    audioCall?: {
      newWords?: number,
      rightAnswers: number,
      series: number,
    },
  }
}

export interface ICreateStat {
  learnedWords: number,
  optional?: {
    learnedWords?: number,
    date?: string,
  }
}

export interface IWordPerDay {
  wordsPerDay: number,
  optional?: {
    value: string,
  },
}