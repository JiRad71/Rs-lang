import Component from "../common/Component";
import MainPage from "./pages/main/mainpage";
import Header from './pages/header';
import Footer from './pages/footer';
import TextBook from './pages/textbook/textbook';
import AudioCall from './pages/audiocall/audioCall';
import SprintGame from './pages/sprint/sprintGame';
import Statistic from './pages/statistic/statistic';
import Authorization from "./pages/authorization/authorization";

type PageTypes = MainPage | TextBook | AudioCall | SprintGame | Authorization;

class Controller extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const header = new Header(parentNode);
    header.node.setAttribute('id', 'header')
    const wrapperMain = new Component(parentNode, 'div', 'wrapper-main');
    const footer = new Footer(parentNode);
    footer.node.setAttribute('id', 'footer')
    const main = new MainPage(wrapperMain.node);

    header.mainBtn.node.onclick = () => this.replace(wrapperMain, new MainPage(wrapperMain.node));
    header.textBookBtn.node.onclick = () => this.replace(wrapperMain, new TextBook(wrapperMain.node));
    header.audioCallBtn.node.onclick = () => this.replace(wrapperMain, new AudioCall(wrapperMain.node));
    header.sprintBtn.node.onclick = () => this.replace(wrapperMain, new SprintGame(wrapperMain.node));
    header.statisticBtn.node.onclick = () => this.replace(wrapperMain, new Statistic(wrapperMain.node));
    header.authorizationBtn.node.onclick = () => this.replace(wrapperMain, new Authorization(wrapperMain.node));

  }

  private replace(place: Component<HTMLElement>, newPage: PageTypes) {
    place.node.replaceChild(newPage.node, place.node.childNodes[0]);
  }
}

export default Controller;
