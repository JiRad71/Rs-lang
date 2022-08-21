import Component from '../../../common/Component';
import { gameDiscription } from './gameText';


class StartGame extends Component {
  btnList: Component[];
  onStart: (index: number) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.btnList = [];
    const title = new Component(this.node, 'h3', 'start-game__title', 'Игра Спринт');
    const aboutGame = new Component(this.node, 'p', 'start-game__title', gameDiscription);
    const skillContainer = new Component(this.node, 'div', 'skills-container');
    for (let i = 0; i < 7; i += 1) {
      this.btnList.push(new Component(skillContainer.node, 'button', 'skill-btn', `Уровень ${i+1}`))
    }
    this.btnList.forEach((btn, i) => {
      btn.node.onclick = () => this.onStart(i);
    })
  }
}

export default StartGame;