import { group } from "console";
import Component from "../../../common/Component";
import { IWordsData } from '../../../asset/utils/types'
import { URL } from '../../../asset/utils/types'
import Card from './card';

class TextBook extends Component {
  words: Component<HTMLElement>;
  item: Component<HTMLElement>;
  itemWrapper: Component<HTMLElement>;
  currentChapter: number;
  currentPage: number;
  currentPageIndex: number;
  buttonActive: Component<HTMLElement>;
  itemButtons: Component<HTMLElement>;
  chapterHard: Component<HTMLElement>;
  card: Card;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'textbook');
    this.currentChapter = 0;
    this.currentPage = 0;
    this.currentPageIndex = 1;
    this.words = new Component(this.node, 'div', 'words');
    this.itemWrapper = new Component(this.words.node, 'div', 'words');

    this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`);

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
    if (localStorage.getItem('token')) {
      this.chapterHard = new Component(chapters.node, 'div', 'chapter', 'Сложные слова');
    }
  }

  private updatePagginator() {
    this.itemWrapper.destroy();
    this.itemWrapper = new Component(this.words.node, 'div', 'words');
    this.buttonActive.node.textContent = `${this.currentPageIndex}`
  }

  private getItemWord(url: string) {
    this.getWord(url).then((data) => {
      if (localStorage.getItem('token')) {
        data.forEach((element: IWordsData) => {
          this.card = new Card(this.itemWrapper.node, element);
          this.card.addButtons();
        });
      } else {
        data.forEach((element: IWordsData) => {
          this.card = new Card(this.itemWrapper.node, element);
        });
      }
    });
  }

  private async getWord(url: string) {
    const resp = await fetch(url);
    return resp.json();
  }
}



export default TextBook;
