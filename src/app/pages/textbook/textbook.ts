import { group } from "console";
import Component from "../../../common/Component";

interface IWordsData {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

enum URL {
  url = 'https://rss-lang-backends.herokuapp.com/words/',
  page = '&page=',
  group = '?group='
}

class TextBook extends Component {
  words: Component<HTMLElement>;
  item: Component<HTMLElement>;
  itemWrapper: Component<HTMLElement>;
  currentChapter: number;
  currentPage: number;
  currentPageIndex: number;
  buttonActive: any;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'textbook');
    this.currentChapter = 0;
    this.currentPage = 0;
    this.currentPageIndex = 1
    this.words = new Component(this.node, 'div', 'words');
    this.itemWrapper = new Component(this.words.node, 'div', 'words')
    this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)




    const pagination = new Component(this.node, 'div', 'pagination')
    const buttonStart = new Component(pagination.node, 'div', 'button_start none_active', '&lt;&lt;')
    const buttonLeft = new Component(pagination.node, 'div', 'button_left none_active', '&lt;')
    this.buttonActive = new Component(pagination.node, 'div', 'button_active', `${this.currentPageIndex}`)
    const buttonRight = new Component(pagination.node, 'div', 'buttom_right', '&gt;')
    const buttonEnd = new Component(pagination.node, 'div', 'buttom_end', '&gt;&gt;')

    const verticalArrows = new Component(this.node, 'div', 'vertical-arrows')
    const arrowUp = new Component(verticalArrows.node, 'button', 'arrow-up')
    const arrowUpElement = new Component(arrowUp.node, 'i', 'arrow up')
    const arrowDown = new Component(verticalArrows.node, 'button', 'arrow-down')
    const arrowDownElement = new Component(arrowDown.node, 'i', 'arrow down')

    arrowUp.node.onclick = () => location.href = '#header'
    arrowDown.node.onclick = () => location.href = '#footer'


    buttonRight.node.onclick = () => {
      if (this.currentPage < 29) {
        this.currentPage++
        this.currentPageIndex++
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      } else { buttonRight.node.classList.add('none_active') }
      if (this.currentPage) {
        buttonStart.node.classList.remove('none_active')
        buttonLeft.node.classList.remove('none_active')
      }
    }

    buttonLeft.node.onclick = () => {
      if (this.currentPage) {
        this.currentPage--
        this.currentPageIndex--
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      }
      if (this.currentPage == 0) {
        buttonLeft.node.classList.add('none_active')
        buttonStart.node.classList.add('none_active')
      }
    }

    buttonEnd.node.onclick = () => {
      this.currentPage = 29;
      this.currentPageIndex = 30;
      this.updatePagginator();
      this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      buttonStart.node.classList.remove('none_active')
      buttonLeft.node.classList.remove('none_active')
      buttonRight.node.classList.add('none_active')
      buttonEnd.node.classList.add('none_active')
    }

    buttonStart.node.onclick = () => {
      this.currentPage = 0;
      this.currentPageIndex = 1;
      this.updatePagginator();
      this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      buttonStart.node.classList.add('none_active')
      buttonLeft.node.classList.add('none_active')
      buttonRight.node.classList.remove('none_active')
      buttonEnd.node.classList.remove('none_active')
    }

    const chapters = new Component(this.node, 'div', 'chapters')
    for (let i = 0; i < 6; i++) {
      const chapter = new Component(chapters.node, 'div', 'chapter', `Раздел ${i + 1}`)
      chapter.node.onclick = () => {
        this.currentChapter = i;
        this.currentPage = 0;
        this.currentPageIndex = 1;
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      }
    }
    const chapterHard = new Component(chapters.node, 'div', 'chapter', 'Сложные слова')
  }

  private updatePagginator() {
    this.itemWrapper.destroy();
    this.itemWrapper = new Component(this.words.node, 'div', 'words');
    this.buttonActive.node.textContent = `${this.currentPageIndex}`
  }

  private getItemWord(url: string) {
    this.getWord(url).then((data) => {
      data.forEach((element: IWordsData) => {
        this.item = new Component(this.itemWrapper.node, 'div', 'item');
        // const wrapper = new Component(this.item.node, 'div', 'wrapper');
        const itemWrapperImg = new Component(this.item.node, 'div', 'item__img');
        const itemImg = new Component(itemWrapperImg.node, 'img');

        const itemWordsTranslate = new Component(this.item.node, 'div', 'item__words-translate');

        const itemWord = new Component(itemWordsTranslate.node, 'p', 'item__word')

        itemImg.node.setAttribute('src', `https://rss-lang-backends.herokuapp.com/${element.image}`)
        const itemWordEng = new Component(itemWord.node, 'span', 'item__word-eng', `${element.word}`);
        const itemWordTranscript = new Component(itemWord.node, 'span', 'item__word-transcript', `${element.transcription}`);
        const itemSeparator = new Component(itemWord.node, 'span', 'item__separator', `|`);
        const itemWordTranslate = new Component(itemWord.node, 'span', 'item__word-translate', `${element.wordTranslate}`);
        const itemSpeaker = new Component(itemWord.node, 'span', 'item__speaker');
        itemSpeaker.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${element.audio}`).play();
        }
        const itemExplain = new Component(itemWordsTranslate.node, 'p', 'item__explain');
        const itemExplainEng = new Component(itemExplain.node, 'span', 'item__explain-eng', `${element.textMeaning}`);
        const itemExplainTranslate = new Component(itemExplain.node, 'span', 'item__explain-translate', `${element.textMeaningTranslate}`);
        const itemSpeakerExplain = new Component(itemExplain.node, 'span', 'item__speaker');
        itemSpeakerExplain.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${element.audioMeaning}`).play();
        }
        const itemExample = new Component(itemWordsTranslate.node, 'p', 'item__example');
        const itemExampleEng = new Component(itemExample.node, 'span', 'item__example-eng', `${element.textExample}`);
        const itemExampleTranslate = new Component(itemExample.node, 'span', 'item__example-translate', `${element.textExampleTranslate}`);
        const itemSpeakerExample = new Component(itemExample.node, 'span', 'item__speaker');
        itemSpeakerExample.node.onclick = () => {
          new Audio(`https://rss-lang-backends.herokuapp.com/${element.audioExample}`).play();
        }
        const itemButtons = new Component(itemWordsTranslate.node, 'div', 'item__buttons')
        const btnDifficult = new Component(itemButtons.node, 'button', 'difficult', 'Сложное')
        const btnLearned = new Component(itemButtons.node, 'button', 'learned', 'Изученное')
      });
    })
  }

  private async getWord(url: string) {
    const resp = await fetch(url);
    return resp.json();
  }
}



export default TextBook;
