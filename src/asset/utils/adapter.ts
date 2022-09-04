import { Request } from './requests';
import { URL } from './types';
import { InputData, IUserWordsCustom } from './types';

class Adapter {
  request: Request;

  constructor() {
    this.request = new Request();
  }

  async add(data: InputData) {

    const userWords: IUserWordsCustom[] = await this.request.getUserWordsData();
    const check = userWords.some((e) => e.wordId);
    const thisWords = userWords.find((e) => e.wordId === data.wordId);

    if (check && thisWords) {
      if (data.game === 'sprint') {
        const wordData: IUserWordsCustom = {
          difficulty: data.difficulty,
          optional: {
            rightAnswers: data.rightAnswer + thisWords.optional.audioCall.rightAnswer,
            sprint: {
              rightAnswer : data.rightAnswer,
              falseAnswer: data.falseAnswer,
              used: data.used,
            },
            audioCall: {
              rightAnswer: thisWords.optional.audioCall.rightAnswer,
              falseAnswer: thisWords.optional.audioCall.falseAnswer,
              used: thisWords.optional.audioCall.used,
            },
          }
        }
    
        this.createUserWord(data.wordId, wordData, data.method);
      } else {
        const wordData: IUserWordsCustom = {
          difficulty: data.difficulty,
          optional: {
            rightAnswers: data.rightAnswer + thisWords.optional.sprint.rightAnswer,
            sprint: {
              rightAnswer: thisWords.optional.sprint.rightAnswer,
              falseAnswer: thisWords.optional.sprint.falseAnswer,
              used: thisWords.optional.sprint.used,
            },
            audioCall: {
              rightAnswer: data.rightAnswer,
              falseAnswer: data.falseAnswer,
              used: data.used,
            },
          }
        }
    
        this.createUserWord(data.wordId, wordData, data.method);
      }
    } else {
      if (data.game === 'sprint') {
        const wordData: IUserWordsCustom = {
          difficulty: data.difficulty,
          optional: {
            rightAnswers: data.rightAnswer,
            sprint: {
              rightAnswer : data.rightAnswer,
              falseAnswer: data.falseAnswer,
              used: data.used,
            },
            audioCall: {
              rightAnswer: 0,
              falseAnswer: 0,
              used: false,
            },
          }
        }
    
        this.createUserWord(data.wordId, wordData, data.method);
      } else {
        const wordData: IUserWordsCustom = {
          difficulty: data.difficulty,
          optional: {
            rightAnswers: data.rightAnswer,
            sprint: {
              rightAnswer: 0,
              falseAnswer: 0,
              used: false,
            },
            audioCall: {
              rightAnswer: data.rightAnswer,
              falseAnswer: data.falseAnswer,
              used: data.used,
            },
          }
        }
        this.createUserWord(data.wordId, wordData, data.method);
      }
    }
  }

  async createUserWord(id: string, data: IUserWordsCustom, method: string) {
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

export default Adapter;
