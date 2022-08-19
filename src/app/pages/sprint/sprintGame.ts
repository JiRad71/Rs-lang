import Component from "../../../common/Component";

class SprintGame extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sprint-game');
    
    const title = new Component(this.node, 'h2', '', 'Sprint игра');

  }
}

export default SprintGame;
