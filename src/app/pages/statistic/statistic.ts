import Component from "../../../common/Component";
import { Request } from "../../../asset/utils/requests";
import { IUserStat } from "../../../asset/utils/types";

class Statistic extends Component {
  request: Request;
  statData: Promise<IUserStat>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'statistic');
    this.request = new Request();
    this.request.getStatistic().then((data: IUserStat) => {

      // const res = {
      //   learnedWords: 0,
      //   optional: {
      //     date: new Date().toLocaleDateString(),
      //     newWords: data.optional.newWords,
      //     learnedWords: data.learnedWords,
      //     rightAnswers: data.optional.rightAnswers,
      //     sprint: {
      //       newWords: data.optional.sprint.newWords,
      //       rightAnswers: data.optional.sprint.rightAnswers,
      //       series: data.optional.sprint.series
      //     },
      //     audioCall: {
      //       newWords: data.optional.audioCall.newWords,
      //       rightAnswers: data.optional.audioCall.rightAnswers,
      //       series: data.optional.audioCall.series
      //     }
      //   }
      // }

      const title = new Component(this.node, 'h2', 'heading', 'Статистика');
      const statisticsSimple = new Component(this.node, 'div', 'statistics-simple');

      const staisticsGames = new Component(statisticsSimple.node, 'div', 'staistics__games statistics__item');
      const titleH3Games = new Component(staisticsGames.node, 'h3', '', 'Статистика по словам');
      const gamesTable = new Component(staisticsGames.node, 'table', 'staistics__games-table');

      const tr1 = new Component(gamesTable.node, 'tr', 'table-row');
      const td1 = new Component(tr1.node, 'td', 'table-column-title', 'Количество новых слов за день');
      const td2 = new Component(tr1.node, 'td', 'table-column-value', `${data.optional.newWords}`);

      const tr2 = new Component(gamesTable.node, 'tr', 'table-row');
      const td3 = new Component(tr2.node, 'td', 'table-column-title', 'Процент правильных ответов');
      const td4 = new Component(tr2.node, 'td', 'table-column-value', `${data.optional.rightAnswers}%`);

      const tr3 = new Component(gamesTable.node, 'tr', 'table-row');
      const td5 = new Component(tr3.node, 'td', 'table-column-title', 'Количество изученных слов за день');
      this.request.aggregatedUserWords(`{"userWords.difficulty": "easy"}`)
        .then((data) => new Component(tr3.node, 'td', 'table-column-value', `${data[0].totalCount.length ? data[0].totalCount[0].count : 0}`))

      const staisticsWords = new Component(statisticsSimple.node, 'div', 'staistics__words statistics__item');
      const titleH3Words = new Component(staisticsWords.node, 'h3', '', 'Статистика по игре Спринт');
      const wordsTable = new Component(staisticsWords.node, 'table', 'staistics__games-table');

      const tr4 = new Component(wordsTable.node, 'tr', 'table-row');
      const td7 = new Component(tr4.node, 'td', 'table-column-title', 'Количество новых слов за день');
      const td8 = new Component(tr4.node, 'td', 'table-column-value', `${data.optional.sprint.newWords}`);


      const tr5 = new Component(wordsTable.node, 'tr', 'table-row');
      const td9 = new Component(tr5.node, 'td', 'table-column-title', 'Процент правильных ответов');
      const td10 = new Component(tr5.node, 'td', 'table-column-value', `${data.optional.sprint.rightAnswers}%`);

      const tr6 = new Component(wordsTable.node, 'tr', 'table-row');
      const td11 = new Component(tr6.node, 'td', 'table-column-title', 'Лучшая серия правильных ответов');
      const td12 = new Component(tr6.node, 'td', 'table-column-value', `${data.optional.sprint.series}`);
      const statisticsTerm = new Component(this.node, 'div', 'statistics-term');

      const wrapAudioCall = new Component(statisticsSimple.node, 'div', 'staistics__games statistics__item');
      const titleAudioCall = new Component(wrapAudioCall.node, 'h3', '', 'Статистика по игре Аудиовызов');
      const tableAudioCall = new Component(wrapAudioCall.node, 'table', 'staistics__games-table');

      const row1 = new Component(tableAudioCall.node, 'tr', 'table-row');
      const column1 = new Component(row1.node, 'td', 'table-column-title', 'Количество новых слов за день');
      const column2 = new Component(row1.node, 'td', 'table-column-value', `${data.optional.audioCall.newWords}`);

      const row2 = new Component(tableAudioCall.node, 'tr', 'table-row');
      const column3 = new Component(row2.node, 'td', 'table-column-title', 'Процент правильных ответов');
      const column4 = new Component(row2.node, 'td', 'table-column-value', `${data.optional.audioCall.rightAnswers}%`);

      const row3 = new Component(tableAudioCall.node, 'tr', 'table-row');
      const column5 = new Component(row3.node, 'td', 'table-column-title', 'Лучшая серия правильных ответов');
      const column6 = new Component(row3.node, 'td', 'table-column-value', `${data.optional.audioCall.series}`);

      // const staisticsWordsDay = new Component(statisticsTerm.node, 'div', 'ctatistic__words-day statistics__item');
      // const titleH3WodsDay = new Component(staisticsWordsDay.node, 'h3', '', 'Количество новых слов за день');
      // const canvasWordsDay = new Component(staisticsWordsDay.node, 'canvas', 'words-day statistics-canvas');

      // const staisticsWordsAll = new Component(statisticsTerm.node, 'div', 'staistics__words statistics__item');
      // const titleH3WordsAll = new Component(staisticsWordsAll.node, 'h3', '', 'Всего изучено слов');
      // const canvasWordsAll = new Component(staisticsWordsAll.node, 'canvas', 'words-all statistics-canvas');
    })
  }
}

export default Statistic;
