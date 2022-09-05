import Component from "../../common/Component";
import {Request} from "../../asset/utils/requests"

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
  userMenu: Component<HTMLElement>;
  burgerWrapp: Component<HTMLElement>;
  request: Request;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');
    const wrapper = new Component(this.node, 'div', 'wrapper');
    this.mainBtn = new Component(wrapper.node, 'button', 'logo', 'RSLang');
    this.mainBtn.node.setAttribute('id', 'main');
    this.request = new Request

    const nav = new Component(wrapper.node, 'nav', 'navigation');
    const menu = new Component(nav.node, 'div', 'navigation-menu');
    this.textBookBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Учебник');
    this.textBookBtn.node.setAttribute('id', 'textbook');
    this.audioCallBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Аудиовызов');
    this.audioCallBtn.node.setAttribute('id', 'audio-call');
    this.sprintBtn = new Component(menu.node, 'button', 'navigation-menu__item', 'Спринт');
    this.sprintBtn.node.setAttribute('id', 'sprint');
    this.btnsWrap = new Component(wrapper.node, 'div', 'auth');
    this.authorizationBtn = new Component(this.btnsWrap.node, 'button', 'navigation-menu__item', 'Bход | Регистрация');
    this.authorizationBtn.node.setAttribute('id', 'authorization');
    
    
    this.userMenu = new Component(this.btnsWrap.node, 'button', 'navigation-menu__items burger');
    this.burgerWrapp = new Component(this.userMenu.node, 'div', 'burger-overlay hidden')
    const burgerUl = new Component(this.burgerWrapp.node, 'ul', 'burger-menu')
    const burgerEmail = new Component(burgerUl.node, 'li', 'burger-menu__li')
    const user = this.request.getUser().then((data)=>{
      const burgerEmailSpan = new Component(burgerEmail.node, 'span', 'burger-menu__li', `${data.email}`)
      
    });
    
    const burgerStat = new Component(burgerUl.node, 'li', 'burger-menu__li')
    this.statisticBtn = new Component(burgerStat.node, 'btn', 'burger-menu__li_btn', 'Статистика')
    this.statisticBtn.node.setAttribute('id', 'statistic');
    if (!localStorage.getItem('token')) {
      this.statisticBtn.node.classList.add('hidden');
    }
    const burgerExit = new Component(burgerUl.node, 'li', 'burger-menu__li')
    this.authUser = new Component(burgerExit.node, 'btn', 'burger-menu__li_btn', 'Выйти')
    this.userMenu.node.onclick = ()=>{
      this.burgerWrapp.node.classList.toggle('hidden')
    }
    this.userMenu.node.classList.add('hidden');
    this.authUser.node.setAttribute('title', 'Выйти');
    
  }

  updateAuth() {
    localStorage.getItem('token') ? this.authUser.node.classList.remove('hidden')
    : this.authUser.node.classList.add('hidden');
  }
}

export default Header;
