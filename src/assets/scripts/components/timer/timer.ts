import './_timer.scss';
import { timerTemplate } from './timer-template';
import { Component } from '../application/component';

export class Timer extends Component {
  private minutes: Component;

  private seconds: Component;

  constructor() {
    super('div', ['timer']);

    const minutesSection = new Component('div', ['section-minutes']);
    this.minutes = new Component('span', ['minutes']);
    minutesSection.element.append(this.minutes.element);

    const secondsSection = new Component('div', ['section-seconds']);
    this.seconds = new Component('span', ['seconds']);
    secondsSection.element.append(this.seconds.element);

    const semicolon = new Component('div', []);
    semicolon.element.append(':');

    this.element.append(
      minutesSection.element,
      semicolon.element,
      secondsSection.element,
    );

    this.minutes.element.innerText = '00';
    this.seconds.element.innerText = '30';
  }

  setTimer(seconds: string): void {
    let i = 0;

    const timer = setInterval(() => {
      this.seconds.element.innerText = i.toString();
      i++;
    }, 1000);
  }
}
