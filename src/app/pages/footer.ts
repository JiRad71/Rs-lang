import Component from "../../common/Component";

class Footer extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', 'footer');

    const wrapper = new Component(this.node, 'div', 'wrapper');
    const leftSide = new Component(wrapper.node, 'div', 'left');
    const rightSide = new Component(wrapper.node, 'div', 'right');
    const contentLeft = new Component(leftSide.node, 'span', 'left_footer_span', `© 2022`);
    const contentRight = new Component(rightSide.node, 'span', 'right_link');
    const linkRSS = new Component(contentRight.node, 'a', 'right_link');
    linkRSS.node.setAttribute('href', 'https://rs.school/index.html');

  }
}

export default Footer;
