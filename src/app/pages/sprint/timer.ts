import Component from "../../../common/Component";

class Timer extends Component {
  time: number;
  onFinish: () => void;
  tick: NodeJS.Timer;

  constructor(parentNode: HTMLElement, time: number) {
    super(parentNode, 'div', 'timer-container');
    this.time = time;
  }

  on() {
    const timerCircle = new Component(this.node, 'div', 'timer minute');
    const hand1 = new Component(timerCircle.node, 'div', 'hand', '<span></span>');
    const hand2 = new Component(timerCircle.node, 'div', 'hand', '<span></span>');
    const display = new Component(this.node, 'div', 'face');
    const count = new Component(display.node, 'span', 'timer-count', `${this.time}`);
    this.tick = setInterval(() => {
      this.time -= 1;
      count.node.textContent = `${this.time}`;
      if (this.time === 0) this.onFinish();
    }, 1000);
  }

  off() {
    clearInterval(this.tick);
  }
}

export default Timer;
