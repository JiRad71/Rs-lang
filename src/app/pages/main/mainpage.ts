import Component from "../../../common/Component";

class MainPage extends Component {
  bgGold: Component<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main');
    const hero = new Component(this.node, 'section', 'hero');
    const wrap = new Component(hero.node, 'hero', 'wrap');
    const title = new Component(wrap.node, 'h1', 'main_heading', 'RSLang');
    const heroText = new Component(wrap.node, 'p', 'hero_text', 'RS Lang – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.');
    this.bgGold = new Component(wrap.node, 'button', '"btn bg_gold', 'Учить слова');

    const container = new Component(this.node, 'div', 'container1');
    const skills = new Component(container.node, 'section', 'skills');
    const headingWrap = new Component(skills.node, 'div', 'heading_wrap');
    const heading = new Component(headingWrap.node, 'h2', 'heading', 'Возможности приложения');

    const flexContainer = new Component(skills.node, 'div', 'flex_container');

    const flexItem = new Component(flexContainer.node, 'div', 'flex_item');
    const imgItem = new Component(flexItem.node, 'div', 'img_item-textbook');
    const headerItem = new Component(flexItem.node, 'h3', 'header_item', 'Учебник');
    const discriptionItem = new Component(flexItem.node, 'p', 'discription_item', 'Изучайте новые слова в учебнике');

    const flexItem1 = new Component(flexContainer.node, 'div', 'flex_item');
    const imgItem1 = new Component(flexItem1.node, 'div', 'img_item-games');
    const headerItem1 = new Component(flexItem1.node, 'h3', 'header_item', 'Игры');
    const discriptionItem1 = new Component(flexItem1.node, 'p', 'discription_item', 'Учите слова по играм Аудиовызов и Спринт');

    const flexItem2 = new Component(flexContainer.node, 'div', 'flex_item');
    const imgItem2 = new Component(flexItem2.node, 'div', 'img_item-statistic');
    const headerItem2 = new Component(flexItem2.node, 'h3', 'header_item', 'Статистика');
    const discriptionItem2 = new Component(flexItem2.node, 'p', 'discription_item', 'Получите доступ к статистике');

    const container2 = new Component(this.node, 'div', 'container2');
    const price = new Component(container2.node, 'div', 'price');
    const headingWrap1 = new Component(price.node, 'div', 'heading_wrap');
    const heading1 = new Component(headingWrap1.node, 'h2', 'heading', 'Разработчики');
    const flexContainerPrice = new Component(price.node, 'div', 'flex_container_price');

    const priceItem = new Component(flexContainerPrice.node, 'div', 'price_item');
    const imgDev = new Component(priceItem.node, 'div', 'img_dev-teamLead');
    const dev = new Component(priceItem.node, 'h3', '', 'Кирилл');
    const desc = new Component(priceItem.node, 'p', '', 'Тимлид, бэкэнд');
    const git = new Component(priceItem.node, 'button', 'bg_gold btn', 'GitHub');

    const priceItem1 = new Component(flexContainerPrice.node, 'div', 'price_item');
    const imgDev1 = new Component(priceItem1.node, 'div', 'img_dev-coding');
    const dev1 = new Component(priceItem1.node, 'h3', '', 'Артём');
    const desc1 = new Component(priceItem1.node, 'p', '', 'Спринт, статистика');
    const git1 = new Component(priceItem1.node, 'button', 'bg_gold btn', 'GitHub');

    const priceItem2 = new Component(flexContainerPrice.node, 'div', 'price_item');
    const imgDev2 = new Component(priceItem2.node, 'div', 'img_dev-layouts');
    const dev2 = new Component(priceItem2.node, 'h3', '', 'Алексей');
    const desc2 = new Component(priceItem2.node, 'p', '', 'Аудиовызов, вёрстка');
    const git2 = new Component(priceItem2.node, 'button', 'bg_gold btn', 'GitHub');


    // const about = new Component(this.node, 'div', 'about');
    // // const title = new Component(about.node, 'h2', 'main-title', 'О приложении');
    // const text = new Component(about.node, 'p', '');
    // text.node.textContent = `RS Lang – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.`;

    // const devWrapper = new Component(this.node, 'div', 'developers');
    // const aboutTeam = new Component(devWrapper.node, 'h2', '', 'О команде');
    // const devSubWarapper = new Component(devWrapper.node, 'div', 'devs');
    // const lead = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Кирилл</a>');
    // const leadLink = new Component(devSubWarapper.node, 'p', '', 'Разработка бэкэнда');
    // const dev1 = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Артём</a>');
    // const dev1Link = new Component(devSubWarapper.node, 'p', '', 'Разработка авторизации');
    // const dev2 = new Component(devSubWarapper.node, 'h3', '', '<a href="#">Алексей</a>');
    // const dev2Link = new Component(devSubWarapper.node, 'p', '', 'Верстка');

  }
}

export default MainPage;
