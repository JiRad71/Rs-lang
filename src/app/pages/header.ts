import Component from "../../common/Component";

class Header extends Component {
  btnList: Component[] = [];
  textBookBtn: Component<HTMLElement>;
  audioCallBtn: Component<HTMLElement>;
  sprintBtn: Component<HTMLElement>;
  statisticBtn: Component<HTMLElement>;
  mainBtn: Component<HTMLElement>;
  authorizationBtn: Component<HTMLElement>;
  authUser: Component<HTMLElement>;
  btnsWrap: Component<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');
    const wrapper = new Component(this.node, 'div', 'wrapper');
    this.mainBtn = new Component(wrapper.node, 'button', 'logo', 'RSLang');
    this.mainBtn.node.setAttribute('id', 'main');

    const nav = new Component(wrapper.node, 'nav', 'navigation');
    const menu = new Component(nav.node, 'div', 'navigation-menu');
    this.textBookBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Учебник');
    this.textBookBtn.node.setAttribute('id', 'textbook');
    this.audioCallBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Аудиовызов');
    this.audioCallBtn.node.setAttribute('id', 'audio-call');
    this.sprintBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Спринт');
    this.sprintBtn.node.setAttribute('id', 'sprint');

    
    this.statisticBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Статистика');
    this.statisticBtn.node.setAttribute('id', 'statistic');
    if (!localStorage.getItem('token')) {
      this.statisticBtn.node.classList.add('hidden');
    }

    this.btnsWrap = new Component(wrapper.node, 'div', 'auth');
    this.authorizationBtn = new Component(this.btnsWrap.node, 'button', 'navigation-menu__item', 'Bход | Регистрация');
    this.authorizationBtn.node.setAttribute('id', 'authorization');

    this.authUser = new Component(this.btnsWrap.node, 'button', 'navigation-menu__item');
    this.authUser.node.classList.add('hidden');
    this.authUser.node.setAttribute('title', 'Выйти');
  }

  updateAuth() {
    localStorage.getItem('token') ? this.authUser.node.classList.remove('hidden')
    : this.authUser.node.classList.add('hidden');
  }
}

export default Header;
