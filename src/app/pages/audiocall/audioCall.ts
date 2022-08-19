import Component from "../../../common/Component";

class AudioCall extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'audio-call');
    
    const title = new Component(this.node, 'h2', '', 'Audio Call игра');

  }
}

export default AudioCall;
