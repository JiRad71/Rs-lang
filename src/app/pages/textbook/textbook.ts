import Component from "../../../common/Component";
import { IWordsData } from '../../../asset/utils/types'
import { URL } from '../../../asset/utils/types'
import Card from './card';
import { Request } from "../../../asset/utils/requests"

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
  request: Request
  buttonLeft: Component<HTMLElement>;
  buttonStart: Component<HTMLElement>;
  buttonRight: Component<HTMLElement>;
  buttonEnd: Component<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'textbook');
    this.currentChapter = 0;
    this.currentPage = 0;
    this.currentPageIndex = 1;
    this.request = new Request();
    this.words = new Component(this.node, 'div', 'words');
    this.itemWrapper = new Component(this.words.node, 'div', 'words');
    if (!localStorage.getItem('currChapter')) {
      localStorage.setItem('currChapter', `${this.currentChapter}`);
      localStorage.setItem('currPage', `${this.currentPage}`);
      this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`);
    } else {
      this.getItemWord(`${URL.url}${URL.group}${localStorage.getItem('currChapter')}${URL.page}${localStorage.getItem('currPage')}`);
    }

    const pagination = new Component(this.node, 'div', 'pagination')
    this.buttonStart = new Component(pagination.node, 'div', 'button_start none_active', '&lt;&lt;')
    this.buttonLeft = new Component(pagination.node, 'div', 'button_left none_active', '&lt;')
    this.buttonActive = new Component(pagination.node, 'div', 'button_active', `${this.currentPageIndex}`)
    this.buttonRight = new Component(pagination.node, 'div', 'buttom_right', '&gt;')
    this.buttonEnd = new Component(pagination.node, 'div', 'buttom_end', '&gt;&gt;')

    this.buttonRight.node.onclick = () => {
      if (this.currentPage < 29) {
        this.currentPage++
        this.currentPageIndex++
        localStorage.setItem('currPage', `${this.currentPage}`);
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      } else { this.buttonRight.node.classList.add('none_active') }
      if (this.currentPage) {
        this.buttonStart.node.classList.remove('none_active')
        this.buttonLeft.node.classList.remove('none_active')
      }
    }

    this.buttonLeft.node.onclick = () => {
      if (this.currentPage) {
        this.currentPage--
        this.currentPageIndex--
        localStorage.setItem('currPage', `${this.currentPage}`);
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      }
      if (this.currentPage == 0) {
        this.buttonLeft.node.classList.add('none_active')
        this.buttonStart.node.classList.add('none_active')
      }
    }

    this.buttonEnd.node.onclick = () => {
      this.currentPage = 29;
      this.currentPageIndex = 30;
      localStorage.setItem('currPage', `${this.currentPage}`);
      this.updatePagginator();
      this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      this.buttonStart.node.classList.remove('none_active')
      this.buttonLeft.node.classList.remove('none_active')
      this.buttonRight.node.classList.add('none_active')
      this.buttonEnd.node.classList.add('none_active')
    }

    this.buttonStart.node.onclick = () => {
      this.currentPage = 0;
      this.currentPageIndex = 1;
      localStorage.setItem('currPage', `${this.currentPage}`);
      this.updatePagginator();
      this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      this.buttonStart.node.classList.add('none_active')
      this.buttonLeft.node.classList.add('none_active')
      this.buttonRight.node.classList.remove('none_active')
      this.buttonEnd.node.classList.remove('none_active')
    }

    const chapters = new Component(this.node, 'div', 'chapters')
    for (let i = 0; i < 6; i++) {
      const chapter = new Component(chapters.node, 'div', 'chapter', `Раздел ${i + 1}`)
      chapter.node.onclick = () => {
        localStorage.removeItem('hardWord')
        this.currentChapter = i;
        this.currentPage = 0;
        this.currentPageIndex = 1;
        this.buttonStart.node.classList.add('none_active')
        this.buttonLeft.node.classList.add('none_active')
        this.buttonRight.node.classList.remove('none_active')
        this.buttonEnd.node.classList.remove('none_active')
        localStorage.setItem('currChapter', `${this.currentChapter}`);
        localStorage.setItem('currPage', `${this.currentPage}`);
        this.updatePagginator();
        this.getItemWord(`${URL.url}${URL.group}${this.currentChapter}${URL.page}${this.currentPage}`)
      }
    }
    if (localStorage.getItem('token')) {
      this.chapterHard = new Component(chapters.node, 'div', 'chapter', 'Сложные слова');
      this.chapterHard.node.onclick= ()=> {
        localStorage.setItem('hardWord', '1')
        this.currentPage = 0;
        this.currentPageIndex = 1;
        this.buttonStart.node.classList.add('none_active')
        this.buttonLeft.node.classList.add('none_active')
        this.buttonRight.node.classList.remove('none_active')
        this.buttonEnd.node.classList.remove('none_active')
        localStorage.setItem('currPage', `${this.currentPage}`);
        this.updatePagginator();
       this.request.aggregatedWords(this.currentPage, `{"userWord.difficulty":"hard"}`)
       .then((data) => data[0].paginatedResults.forEach((element: IWordsData)=>{
        
        this.card = new Card(this.itemWrapper.node, element)
        this.card.addButtons(false);
       })
        )
      }
    }
  }

  private updatePagginator() {
    this.itemWrapper.destroy();
    this.itemWrapper = new Component(this.words.node, 'div', 'words');
    this.buttonActive.node.textContent = `${this.currentPageIndex}`
  }

  private getItemWord(url: string) {
      if (localStorage.getItem('token')) {
        this.request.aggregatedAllWords(+localStorage.getItem('currPage'),'{"$or":[{"userWord.difficulty":"normal"},{"userWord":null}]}', +localStorage.getItem('currChapter'))
        .then((data)=>{
          data[0].paginatedResults.forEach((element: IWordsData) => {
          this.card = new Card(this.itemWrapper.node, element);
          this.card.addButtons(true);
        })});
      } else {
        this.getWord(url).then((data) => {
        data.forEach((element: IWordsData) => {
          this.card = new Card(this.itemWrapper.node, element);
        });
      })
      .catch(() => console.log('Войдите в аккаунт для того, что бы продолжить'));
      }
    
  }

  private async getWord(url: string) {
    const resp = await fetch(url);
    return resp.json();
  }
}



export default TextBook;
