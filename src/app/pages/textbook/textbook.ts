import Component from "../../../common/Component";

class TextBook extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'textbook');
    
    const title = new Component(this.node, 'h2', 'textbook', 'Textbook');

  }
}

export default TextBook;
