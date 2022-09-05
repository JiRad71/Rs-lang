import Component from "../common/Component";
import MainPage from "./pages/main/mainpage";
import Header from './pages/header';
import Footer from './pages/footer';
import TextBook from './pages/textbook/textbook';
import AudioCall from './pages/audiocall/audioCall';
import SprintGame from './pages/sprint/sprintGame';
import Auth from './pages/authorization/Auth';
import Statistic from './pages/statistic/statistic';
import { IUserData, IUserStat, URL } from '../asset/utils/types';
import { Request } from "../asset/utils/requests";

class Controller extends Component {
  wrapperMain: Component<HTMLElement>;
  header: Header;
  textbook: TextBook;
  auth: Auth;
  root: Component<HTMLElement>;
  footer: Footer;
  reqest: Request;
  wrapper: Component<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(null);
    this.header = new Header(parentNode);

    this.header.node.setAttribute('id', 'header');
    this.root = new Component(parentNode, 'div', 'root');
    this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
    this.footer = new Footer(null);
    this.footer.node.setAttribute('id', 'footer');
    const main = new MainPage(this.wrapperMain.node);

    this.reqest = new Request();
  
    this.auth = new Auth();
    this.auth.checkUser(this.header.authorizationBtn, this.header.authUser);

    this.header.mainBtn.node.onclick = () => {
      location.hash = this.header.mainBtn.node.id;
    }

    this.header.textBookBtn.node.onclick = () => {
      location.hash = this.header.textBookBtn.node.id;
      this.auth.checkUser(this.header.authorizationBtn, this.header.authUser);
      this.header.authUser.node.classList.add('hidden');
    }
   
    this.header.audioCallBtn.node.onclick = () => {
      location.hash = this.header.audioCallBtn.node.id;
    }
    
    this.header.sprintBtn.node.onclick = () => {
      if (location.hash === '#textbook') {
        location.hash = this.header.sprintBtn.node.id;

      } else {
        location.hash = this.header.sprintBtn.node.id;
        localStorage.removeItem('currChapter');
        localStorage.removeItem('currPage');
      }
    }
    
    this.header.statisticBtn.node.onclick = () => {
      location.hash = this.header.statisticBtn.node.id;
    }
    
    this.header.authorizationBtn.node.onclick = () => {
      location.hash = this.header.authorizationBtn.node.id;
    }
  }

  handleRoute() {
    const route = document.location.hash ? document.location.hash.slice(1) : '';
    this.header.updateAuth();

    if (route && route === 'main') {
      this.footer.destroy();
      this.wrapperMain.destroy();
      this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
      const main = new MainPage(this.wrapperMain.node);
      this.footer = new Footer(document.body);
    }
    if (route && route === 'textbook') {
      this.footer.destroy();
      this.wrapperMain.destroy();
      localStorage.removeItem('hardWord');
      this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
      const textbook = new TextBook(this.wrapperMain.node);
      this.footer = new Footer(document.body);
    }
    if (route && route === 'audio-call') {
      this.wrapperMain.destroy();
      this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
      const audioCall =  new AudioCall(this.wrapperMain.node);
      this.footer.destroy()
    }
    if (route && route === 'sprint') {
      this.wrapperMain.destroy();
      this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
      const sprint =  new SprintGame(this.wrapperMain.node);
      this.footer.destroy()
    }
    if (route && route === 'statistic') {
      this.footer.destroy();
      this.wrapperMain.destroy();
      this.wrapperMain = new Component(this.root.node, 'div', 'wrapper-main');
      const statistic =  new Statistic(this.wrapperMain.node);
      this.footer = new Footer(document.body);
    }
    if (route && route === 'authorization') {
      this.footer.destroy();
      const authElem = this.auth.render(this.wrapperMain.node);
      this.wrapperMain.node.replaceChild(authElem, this.wrapperMain.node.childNodes[0]);

      this.auth.onLogin = (inputsData: IUserData) => {
        this.auth.addOrGetUser(inputsData, `${URL.shortUrl}${URL.login}`);
      }

      this.auth.onSignin = (inputsData: IUserData) => {
        this.auth.addOrGetUser(inputsData, `${URL.shortUrl}${URL.signin}`)
          .then((resp) => resp.json())
          .then((resp) => {
            window.localStorage.setItem('token', `${resp.token}`);
            window.localStorage.setItem('usersId', `${resp.userId}`);
          })
          .then(() => {
            this.checkStat();
          })
          .then(() => {
            this.auth.checkUser(this.header.authorizationBtn, this.header.authUser);
          })
          .then(() => {
            this.wrapperMain.destroy();
            location.hash = 'main';
          })
          .catch(() => {
            const message = new Component(authElem, 'span', 'message', 'Неверный пароль.');
            setTimeout(() => message.destroy(), 5000);
          })
      }
      this.footer = new Footer(document.body);
    }
  }

  async checkStat() {
    try {
      const stat = await this.reqest.getStatistic();
    } catch (error) {
      const newStat: IUserStat = await this.reqest.putStatistic({
        learnedWords: 0,
        optional: {
          date: new Date().toLocaleDateString(),
          newWords: 0,
          learnedWords: 0,
          rightAnswers: 0,
          sprint: {
            newWords: 0,
            rightAnswers: 0,
            series: 0,
          },
          audioCall: {
            newWords: 0,
            rightAnswers: 0,
            series: 0,
          },
        }
      });
    }
  }

  initRouter() {
    addEventListener('hashchange', this.handleRoute.bind(this));
    this.handleRoute();
  }
}

export default Controller;
