import Component from "../../common/Component";

class Header extends Component {
  btnList: Component[] = [];
  textBookBtn: Component<HTMLElement>;
  audioCallBtn: Component<HTMLElement>;
  sprintBtn: Component<HTMLElement>;
  statisticBtn: Component<HTMLElement>;
  mainBtn: Component<HTMLElement>;
  authorizationBtn: Component<HTMLElement>;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');

    // const namesBtns: string[] = ['Textbook', 'Audio Call', 'Sprint', 'Statistic'];
    const wrapper = new Component(this.node, 'div', 'wrapper');
    this.mainBtn = new Component(wrapper.node, 'button', 'logo', 'RSLang');

    const nav = new Component(wrapper.node, 'nav', 'navigation');
    const menu = new Component(nav.node, 'div', 'navigation-menu');
    this.textBookBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Учебник');
    this.audioCallBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Аудиовызов');
    this.sprintBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Спринт');
    this.statisticBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Статистика');

    const authorization = new Component(wrapper.node, 'div', 'auth');
    this.authorizationBtn = new Component(authorization.node, 'button', 'navigation-menu__item', 'Bход | Регистрация');

  }
}

export default Header;
