import Component from '../../../common/Component';

class FinishGame extends Component {
  nextGame: () => void;
  onClose: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode);

    const title = new Component(this.node, 'h3', '', 'Результаты игры');

    const result = new Component(this.node, 'div', 'results');
    
    const table = new Component(result.node, 'table', 'results-table');
    
    const btnRestart = new Component(result.node, 'button', '', 'Играть ещё');
    btnRestart.node.onclick = () => this.nextGame();
    const btnExit = new Component(result.node, 'button', '', 'Выход');
    btnExit.node.onclick = () => this.onClose();

  }
}

export default FinishGame;