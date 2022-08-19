import Component from "../../../common/Component";
import Footer from "../footer";

class Statistic extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'statistic');
    
    const title = new Component(this.node, 'h2', '', 'Statistic');


  }
}

export default Statistic;
