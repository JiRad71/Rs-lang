import Component from "../../../common/Component";

interface IWordsData {
  id:	string
  group:	number
  page:	number
  word:	string
  image:	string
  audio:	string
  audioMeaning:	string
  audioExample:	string
  textMeaning:	string
  textExample:	string
  transcription:	string
  wordTranslate:	string
  textMeaningTranslate:	string
  textExampleTranslate:	string
  }


class TextBook extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'textbook');
    
    const words = new Component(this.node, 'div', 'words');
    

    this.getWord('https://rss-lang-backends.herokuapp.com/words/?page=0&group=0').then((data)=> {
      data.forEach((element: IWordsData) => {
        const item = new Component(words.node, 'div', 'item');
        const wrapper = new Component(item.node, 'div', 'wrapper');
        const itemWrapperImg = new Component(wrapper.node, 'div', 'item__img');
        const itemImg = new Component(itemWrapperImg.node, 'img');
        const itemWord = new Component(wrapper.node, 'p', 'item__word')
        const itemButtons = new Component(item.node, 'div', 'item__buttons')
        const btnDifficult = new Component(itemButtons.node, 'button', 'difficult', 'Сложное')
        const btnLearned = new Component(itemButtons.node, 'button', 'learned', 'Изученное')
        itemImg.node.setAttribute('src', `https://rss-lang-backends.herokuapp.com/${element.image}`)
        const itemWordEng = new Component(itemWord.node, 'span', 'item__word-eng', `${element.word}`);
        const itemWordTranscript = new Component(itemWord.node, 'span', 'item__word-transcript', `${element.transcription}`);
        const itemSeparator = new Component(itemWord.node, 'span', 'item__separator', `|`);
        const itemWordTranslate = new Component(itemWord.node, 'span', 'item__word-translate', `${element.wordTranslate}`);
        const itemSpeaker = new Component(itemWord.node, 'span', 'item__speaker', ``);
        const itemExplain = new Component(wrapper.node, 'p', 'item__explain');
        const itemExplainEng = new Component(itemExplain.node, 'span', 'item__explain-eng', `${element.textMeaning}`);
        const itemExplainTranslate = new Component(itemExplain.node, 'span', 'item__explain-translate', `${element.textMeaningTranslate}`);
        const itemExample = new Component(wrapper.node, 'p', 'item__example');
        const itemExampleEng = new Component(itemExample.node, 'span', 'item__example-eng', `${element.textExample}`);
        const itemExampleTranslate = new Component(itemExample.node, 'span', 'item__example-translate', `${element.textExampleTranslate}`);
      });
    })


    const pagination  = new Component(this.node, 'div', 'pagination')
    const buttonStart  = new Component(pagination.node, 'div', 'button_start none_active', '&lt;&lt;')
    const buttonLeft  = new Component(pagination.node, 'div', 'button_left none_active', '&lt;')
    const buttonActive  = new Component(pagination.node, 'div', 'button_active', '1')
    const buttomRight  = new Component(pagination.node, 'div', 'buttom_right', '&gt;')
    const buttomEnd  = new Component(pagination.node, 'div', 'buttom_end', '&gt;&gt;')




    const chapters  = new Component(this.node, 'div', 'chapters')
    for (let i = 0; i < 6; i++ ){
      const chapter = new Component(chapters.node, 'div', 'chapter', `Раздел ${i + 1}`)
    }
    const chapterHard = new Component(chapters.node, 'div', 'chapter', 'Сложные слова' )
  }

  private async getWord(url:string) {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return resp.json();
  }
}



export default TextBook;
