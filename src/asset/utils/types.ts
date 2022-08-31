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
  stat = 'statistics'
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
}

export interface IUserWordsData {
  id: string,
  difficulty: string,
  wordId: string,
}

export interface ICreateUserWord {
  difficulty: string,
  optional?: createUserWordOption,
}

export interface createUserWordOption {
  stat: string[],
}

export interface IUserStat {
  learnedWords: number,
  optional?: {
    game: string,
    successCount: number,
    failCount: number,
    page: number,
    group: number,
  }
}