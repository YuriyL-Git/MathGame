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

    this.setTimer(10);
  }

  /*  setTimer(minutes: string, seconds: string): void {
    this.minutes.element.innerText = minutes;
    this.seconds.element.innerText = seconds;
  } */

  setTimer(seconds: number): void {
    const minutesValue = Math.floor(seconds / 60);
    const secondsValue = seconds - 60 * minutesValue;

    this.minutes.element.innerText = `0${minutesValue}`;
    this.seconds.element.innerText =
      secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;
  }

  startCountDown(countDown: number): void {
    clearInterval(this.timerId);
    let countDownTime = countDown;
    this.setTimer(countDownTime);
    /*  const minutes = parseInt(this.minutes.element.innerText, 10);
    const seconds = parseInt(this.seconds.element.innerText, 10);
    let countDownTime = minutes * 60 + seconds; */

    this.timerId = setInterval(() => {
      countDownTime--;
      if (countDownTime === 0) this.startCountUp();
      this.setTimer(countDownTime);
    }, 1000);
  }

  startCountUp(): void {
    this.stopTimer();
    let secondsPassed = 0;
    this.timerId = setInterval(() => {
      secondsPassed++;
      this.setTimer(secondsPassed);
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
    }, 250);

    const showTimer = setInterval(() => {
      i++;
      if (i > 2) {
        clearInterval(hideTimer);
        clearInterval(showTimer);
      }
      this.minutes.show();
      this.seconds.show();
    }, 500);
  }
}
