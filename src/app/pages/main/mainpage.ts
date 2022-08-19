import Component from "../../../common/Component";

class MainPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'main');
    
    const about = new Component(this.node, 'div', 'about');
    const title = new Component(about.node, 'h2', '', 'О приложении');
    const text = new Component(about.node, 'p', '');
    text.node.textContent = `RS Lang – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.`;

    const devWrapper = new Component(this.node, 'div', 'developers');
    const aboutTeam = new Component(devWrapper.node, 'h2', '', 'О команде');
    const devSubWarapper = new Component(devWrapper.node, 'div', 'devs');
    const lead = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Кирилл</a>');
    const leadLink = new Component(devSubWarapper.node, 'p', '', 'Разработка бэкэнда');
    const dev1 = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Артём</a>');
    const dev1Link = new Component(devSubWarapper.node, 'p', '', 'Разработка авторизации');
    const dev2 = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Алексей</a>');
    const dev2Link = new Component(devSubWarapper.node, 'p', '', 'Верстка');

  }
}

export default MainPage;
