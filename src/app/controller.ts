import Component from "../common/Component";
import MainPage from "./pages/main/mainpage";
import Header from './pages/header';
import Footer from './pages/footer';
import TextBook from './pages/textbook/textbook';
import AudioCall from './pages/audiocall/audioCall';
import SprintGame from './pages/sprint/sprintGame';
import Auth from './pages/authorization/Auth';
import Statistic from './pages/statistic/statistic';
import Authorization from "./pages/authorization/authorization";
import { IUserData, PageTypes, URL } from '../asset/utils/types';

class Controller extends Component {
  wrapperMain: Component<HTMLElement>;
  onReqest: () => void;
  header: Header;
  textbook: TextBook;
  auth: Auth;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.header = new Header(parentNode);

    this.header.node.setAttribute('id', 'header');
    this.wrapperMain = new Component(parentNode, 'div', 'wrapper-main');
    const footer = new Footer(parentNode);
    footer.node.setAttribute('id', 'footer');
    const main = new MainPage(this.wrapperMain.node);
    this.textbook = new TextBook(this.wrapperMain.node);
    this.textbook.node.classList.add('hidden');

    this.auth = new Auth();
    this.auth.checkUser(this.header.authorizationBtn, this.header.authUser, this.header.btnsWrap);

    this.header.mainBtn.node.onclick = () => {
      location.hash = this.header.mainBtn.node.id;

    }
    this.header.textBookBtn.node.onclick = () => {
      location.hash = this.header.textBookBtn.node.id;
      console.log(this.textbook.itemButtons.node);
      this.textbook.itemButtons.node.classList.remove('hidden');

    }
   
    this.header.audioCallBtn.node.onclick = () => {
      location.hash = this.header.audioCallBtn.node.id;
    }
    
    this.header.sprintBtn.node.onclick = () => {
      location.hash = this.header.sprintBtn.node.id;
    }
    
    this.header.statisticBtn.node.onclick = () => {
      location.hash = this.header.statisticBtn.node.id;
    }
    
    this.header.authorizationBtn.node.onclick = () => {
      location.hash = this.header.authorizationBtn.node.id;
    }
  }

  private replace(place: Component<HTMLElement>, newPage: PageTypes) {
    place.node.replaceChild(newPage.node, place.node.childNodes[0]);
  }

  handleRoute() {
    const route = document.location.hash ? document.location.hash.slice(1) : '';

    if (route && route === 'main') {
      this.replace(this.wrapperMain, new MainPage(this.wrapperMain.node));
    }
    if (route && route === 'textbook') {
      this.replace(this.wrapperMain, this.textbook);
      this.textbook.node.classList.remove('hidden');
    }
    if (route && route === 'audio-call') {
      this.replace(this.wrapperMain, new AudioCall(this.wrapperMain.node));
    }
    if (route && route === 'sprint') {
      this.replace(this.wrapperMain, new SprintGame(this.wrapperMain.node));
    }
    if (route && route === 'statistic') {
      this.replace(this.wrapperMain, new Statistic(this.wrapperMain.node));
    }
    if (route && route === 'authorization') {
      const authElem = this.auth.render(this.wrapperMain.node);
      this.wrapperMain.node.replaceChild(authElem, this.wrapperMain.node.childNodes[0]);
      this.auth.onSignin = (inputsData: IUserData) => {
        this.auth.addOrGetUser(inputsData, `${URL.shortUrl}${URL.signin}`)
          .then((resp) => resp.json()) // получаем токен, сохраняем в локал сторэйдж
          .then((resp) => {
            window.localStorage.setItem('token', `${resp.token}`);
            window.localStorage.setItem('usersId', `${resp.userId}`);
            setTimeout(() => {
              window.localStorage.removeItem('token');
            }, 14400000) 
          })
          .catch(() => {
            const message = new Component(authElem, 'span', 'message', 'Неверный пароль.');
            setTimeout(() => message.destroy(), 5000);
          })
          .then(() => {
            this.auth.checkUser(this.header.authorizationBtn, this.header.authUser, this.header.btnsWrap);

          })
      }
    }
  }

  initRouter() {
    addEventListener('hashchange', this.handleRoute.bind(this));
    this.handleRoute();
  }
}

export default Controller;
