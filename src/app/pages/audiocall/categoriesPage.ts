import Component from "../../../common/Component";

class CategoriesPage extends Component {
  onBack: () => void;
  onSelect: (index: number) => void;
  game: Component<HTMLElement>;
  buttons: Component<HTMLElement>;
  descrioption: Component<HTMLElement>;
  title: Component<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode);

    this.game = new Component(this.node, 'div', 'game');
    this.title = new Component(this.game.node, 'h2', 'heading', 'Игра Аудиовызов');
    this.descrioption = new Component(this.game.node, 'p', 'descrioption', 'В игре Аудовызов вы должны выбрать перевод услышанного слова.');
    this.buttons = new Component(this.game.node, 'div', 'chapters');

    for (let i = 0; i < 6; i++) {
      const button = new Component(this.buttons.node, 'button', 'chapter', `Раздел ${(i + 1).toString()}`)
      button.node.onclick = () => this.onSelect(i)
    }
  }
}
export default CategoriesPage;
