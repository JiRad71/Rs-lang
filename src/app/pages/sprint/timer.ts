import Component from "../../../common/Component";

class Timer extends Component {
  time: number;
  onFinish: () => void;

  constructor(parentNode: HTMLElement, time: number) {
    super(parentNode, 'div', 'timer-container');
    this.time = time;
    const timerCircle = new Component(this.node, 'div', 'timer minute');
    const hand1 = new Component(timerCircle.node, 'div', 'hand', '<span></span>');
    const hand2 = new Component(timerCircle.node, 'div', 'hand', '<span></span>');
    const display = new Component(this.node, 'div', 'face');
    const count = new Component(display.node, 'span', 'timer-count', `${this.time}`);
    const tick = setInterval(() => {
      this.time -= 1;
      count.node.textContent = `${this.time}`;
      if (this.time === 0) {
        clearInterval(tick);
        hand1.destroy();
        hand2.destroy();
      }
    }, 1000);
  }
}

export default Timer;
