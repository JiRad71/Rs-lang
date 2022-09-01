import Card from '../../app/pages/textBook/card';
import Component from '../../common/Component';
import { URL, IWordsData, IUserData, ICreateUserWord, IUserStat, IUsersAnswer, IUserWordsData } from './types'

export class Request {
  constructor() {
  }

  public async getWord(url: string) {
    const resp = await fetch(url);
    return resp.json();
  }

  public checkUser(authBtn: Component<HTMLElement>, authUser: Component<HTMLElement>) {
    if (window.localStorage.getItem('token')) {
      const resp = fetch(`${URL.shortUrl}${URL.login}/${window.localStorage.getItem('usersId')}`, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      resp.then((data) => data.json())
        .then((data) => data)
        .then((data) => {
          authBtn.node.classList.add('hidden');
          authUser.node.textContent = `${data.email}`;
          if (location.hash === '#textbook') {
            authUser.node.classList.add('hidden');
          } else {
            authUser.node.classList.remove('hidden');
          }
          authUser.node.onclick = () => {
            authUser.node.textContent = '';
            authUser.node.classList.add('hidden');
            authBtn.node.classList.remove('hidden');
            window.localStorage.removeItem('usersId');
            window.localStorage.removeItem('token');
          }
        })
        .catch(() => console.log('Вы не зарегистрированы'));
    }
  }

  async addOrGetUser(data: IUserData, url: string) {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return resp;
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
  async aggregatedWords(pageNumber: number, filter: string) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.aggregatedWords}?${URL.page}${pageNumber}&${URL.wordPerPage}&${URL.filter}${encodeURIComponent(filter)}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return resp.json();
  }

  async aggregatedAllWords(pageNumber: number, filter: string, group?: number) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.aggregatedWords}${URL.group}${group}&${URL.page}${pageNumber}&${URL.wordPerPage}&${URL.filter}${encodeURIComponent(filter)}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return resp.json();
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

  async deleteUserWord(idWord: string) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.words}/${idWord}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
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

  async updateUserWords(data: ICreateUserWord) {
    const resp = await fetch(`${URL.shortUrl}${URL.login}/${localStorage.getItem('usersId')}/${URL.words}`, {
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
}