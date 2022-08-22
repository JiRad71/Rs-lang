import Component from "../common/Component";
import MainPage from "./pages/main/mainpage";
import Header from './pages/header';
import Footer from './pages/footer';
import TextBook from './pages/textbook/textbook';
import AudioCall from './pages/audiocall/audioCall';
import SprintGame from './pages/sprint/sprintGame';
import Statistic from './pages/statistic/statistic';
import Authorization from "./pages/authorization/authorization";
import { PageTypes } from '../asset/utils/types';

class Controller extends Component {
  wrapperMain: Component<HTMLElement>;
  onReqest: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const header = new Header(parentNode);
    header.node.setAttribute('id', 'header');
    this.wrapperMain = new Component(parentNode, 'div', 'wrapper-main');
    const footer = new Footer(parentNode);
    footer.node.setAttribute('id', 'footer');
    const main = new MainPage(this.wrapperMain.node);

    header.mainBtn.node.onclick = () => {
      location.hash = header.mainBtn.node.id;

    }
    header.textBookBtn.node.onclick = () => {
      location.hash = header.textBookBtn.node.id;
    }
   
    header.audioCallBtn.node.onclick = () => {
      location.hash = header.audioCallBtn.node.id;
    }
    
    header.sprintBtn.node.onclick = () => {
      location.hash = header.sprintBtn.node.id;
    }
    
    header.statisticBtn.node.onclick = () => {
      location.hash = header.statisticBtn.node.id;
    }
    
    header.authorizationBtn.node.onclick = () => {
      location.hash = header.authorizationBtn.node.id;
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
      this.replace(this.wrapperMain,new TextBook(this.wrapperMain.node));
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
      this.replace(this.wrapperMain, new Authorization(this.wrapperMain.node));
    }
  }

  initRouter() {
    addEventListener('hashchange', this.handleRoute.bind(this));
    this.handleRoute();
  }
}

export default Controller;
