import Component from "../../../common/Component";

class Statistic extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'statistic');

    const title = new Component(this.node, 'h2', 'heading', 'Статистика');
    const statisticsSimple = new Component(this.node, 'div', 'statistics-simple');

    const staisticsGames = new Component(statisticsSimple.node, 'div', 'staistics__games statistics__item');
    const titleH3Games = new Component(staisticsGames.node, 'h3', '', 'Статистика по играм');
    const gamesTable = new Component(staisticsGames.node, 'table', 'staistics__games-table');

    const tr1 = new Component(gamesTable.node, 'tr');
    const td1 = new Component(tr1.node, 'td', '', 'Количество новых слов за день');
    const td2 = new Component(tr1.node, 'td', '', '0');

    const tr2 = new Component(gamesTable.node, 'tr');
    const td3 = new Component(tr2.node, 'td', '', 'Процент правильных ответов');
    const td4 = new Component(tr2.node, 'td', '', '0 %');

    const tr3 = new Component(gamesTable.node, 'tr');
    const td5 = new Component(tr3.node, 'td', '', 'Самая длинная серия правильных ответов');
    const td6 = new Component(tr3.node, 'td', '', '0');

    const buttons = new Component(staisticsGames.node, 'div', 'statistics__game-buttons');
    const button1 = new Component(buttons.node, 'button', 'statistics__game-button statistics__btn-active', 'Спринт');
    const button2 = new Component(buttons.node, 'button', 'statistics__game-button', 'Аудиовызов');

    const staisticsWords = new Component(statisticsSimple.node, 'div', 'staistics__words statistics__item');
    const titleH3Words = new Component(staisticsWords.node, 'h3', '', 'Статистика по играм');
    const wordsTable = new Component(staisticsWords.node, 'table', 'staistics__words-table');

    const tr4 = new Component(wordsTable.node, 'tr');
    const td7 = new Component(tr4.node, 'td', '', 'Количество новых слов за день');
    const td8 = new Component(tr4.node, 'td', '', '0');

    const tr5 = new Component(wordsTable.node, 'tr');
    const td9 = new Component(tr5.node, 'td', '', 'Процент правильных ответов');
    const td10 = new Component(tr5.node, 'td', '', '0 %');

    const tr6 = new Component(wordsTable.node, 'tr');
    const td11 = new Component(tr6.node, 'td', '', 'Самая длинная серия правильных ответов');
    const td12 = new Component(tr6.node, 'td', '', '0');

  }
}

export default Statistic;
