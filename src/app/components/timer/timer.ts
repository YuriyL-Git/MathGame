import './_timer.scss';
import { Component } from '../shared/component';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const BLINK_HIDE_TIME = 250;
const BLINK_SHOW_TIME = 500;
const TIMER_BLINKS_QTY = 2;
const DEFAULT_TIME = 0;

const BLUE_COLOR = '#1839cd';
const RED_COLOR = '#ec3d3d';

export class Timer extends Component {
  private minutes: Component;

  private semicolon: Component;

  private seconds: Component;

  private timerId = 0;

  public currentTime = 0;

  constructor() {
    super('div', ['timer']);

    const minutesSection = new Component('div', []);
    this.minutes = new Component('span', ['minutes']);
    minutesSection.element.append(this.minutes.element);

    const secondsSection = new Component('div', []);
    this.seconds = new Component('span', ['seconds']);
    secondsSection.element.append(this.seconds.element);

    this.semicolon = new Component('div', []);
    this.semicolon.element.append(':');

    this.element.append(
      minutesSection.element,
      this.semicolon.element,
      secondsSection.element,
    );

    this.setTimer(DEFAULT_TIME);
  }

  setTimer(seconds: number): void {
    const minutesValue = Math.floor(seconds / SECONDS_IN_MINUTE);
    const secondsValue = seconds - SECONDS_IN_MINUTE * minutesValue;

    this.minutes.element.innerText = `0${minutesValue}`;
    this.seconds.element.innerText =
      secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;
  }

  startCountDown(countDown: number): void {
    clearInterval(this.timerId);
    let countDownTime = countDown;
    this.setTimer(countDownTime);
    this.changeColorTo(RED_COLOR);

    this.timerId = setInterval(() => {
      countDownTime--;
      if (countDownTime === 0) this.startCountUp();
      this.setTimer(countDownTime);
    }, MILLISECONDS_IN_SECOND);
  }

  startCountUp(): void {
    this.stopTimer();
    this.currentTime = 0;
    this.timerId = setInterval(() => {
      this.currentTime++;
      this.setTimer(this.currentTime);
    }, MILLISECONDS_IN_SECOND);
  }

  stopTimer(): void {
    this.changeColorTo(BLUE_COLOR);
    clearInterval(this.timerId);
    this.blinkTimer();
  }

  resetTimer(): void {
    this.changeColorTo(BLUE_COLOR);
    clearInterval(this.timerId);
    this.setTimer(DEFAULT_TIME);
  }

  changeColorTo(color: string): void {
    this.minutes.element.style.color = color;
    this.seconds.element.style.color = color;
    this.semicolon.element.style.color = color;
  }

  /* blink effect after timer stops */
  blinkTimer(): void {
    let i = 1;
    const hideTimer = setInterval(() => {
      this.minutes.hide();
      this.seconds.hide();
    }, BLINK_HIDE_TIME);

    const showTimer = setInterval(() => {
      i++;
      if (i > TIMER_BLINKS_QTY) {
        clearInterval(hideTimer);
        clearInterval(showTimer);
      }
      this.minutes.show();
      this.seconds.show();
    }, BLINK_SHOW_TIME);
  }
}
