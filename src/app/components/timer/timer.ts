import './_timer.scss';
import { Component } from '../shared/component';

export class Timer extends Component {
  private minutes: Component;

  private seconds: Component;

  private timerId = 0;

  constructor() {
    super('div', ['timer']);

    const minutesSection = new Component('div', []);
    this.minutes = new Component('span', ['minutes']);
    minutesSection.element.append(this.minutes.element);

    const secondsSection = new Component('div', []);
    this.seconds = new Component('span', ['seconds']);
    secondsSection.element.append(this.seconds.element);

    const semicolon = new Component('div', []);
    semicolon.element.append(':');

    this.element.append(
      minutesSection.element,
      semicolon.element,
      secondsSection.element,
    );

    this.setTimer('00', '30');
  }

  setTimer(minutes: string, seconds: string): void {
    this.minutes.element.innerText = minutes;
    this.seconds.element.innerText = seconds;
  }

  startTimer(): void {
    const minutes = parseInt(this.minutes.element.innerText, 10);
    const seconds = parseInt(this.seconds.element.innerText, 10);
    let countDownTime = minutes * 60 + seconds;

    this.timerId = setInterval(() => {
      countDownTime--;
      if (countDownTime === 0) this.stopTimer();

      const minutesValue = Math.floor(countDownTime / 60);
      const secondsValue = countDownTime - 60 * minutesValue;

      this.minutes.element.innerText = `0${minutesValue}`;
      this.seconds.element.innerText =
        secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerId);
    this.blinkTimer();
    this.element.dispatchEvent(new CustomEvent('timerstop'));
  }

  /* blink effect after timer stops */
  blinkTimer(): void {
    let i = 1;
    const hideTimer = setInterval(() => {
      this.minutes.hide();
      this.seconds.hide();
    }, 300);

    const showTimer = setInterval(() => {
      i++;
      if (i > 3) {
        clearInterval(hideTimer);
        clearInterval(showTimer);
      }
      this.minutes.show();
      this.seconds.show();
    }, 600);
  }
}
