import { Component } from '../shared/component';
import './_popup.scss';
import { Button } from '../shared/button';

const STARS_QTY = 40;

export class Popup extends Component {
  private popup: Component;

  private buttonOk: Button;

  private scoreInfo: Component;

  constructor() {
    super('div', ['popup-wrapper']);
    this.popup = new Component('div', ['popup']);
    const title = new Component('p', ['popup__title']);
    title.element.innerText = 'Success!';
    this.scoreInfo = new Component('p', ['popup__score']);

    this.buttonOk = new Button(['popup__btn'], 'OK');

    const starsBackground = new Component('div', ['stars_background']);
    for (let i = 0; i < STARS_QTY; i++) {
      const star = new Component('div', ['shooting_star']);
      starsBackground.element.append(star.element);
    }

    this.popup.element.append(
      title.element,
      starsBackground.element,
      this.scoreInfo.element,
      this.buttonOk.element,
    );
    this.element.append(this.popup.element);

    this.hide();

    this.start();
  }

  start(): void {
    this.buttonOk.element.addEventListener('click', () => {
      this.hide();
    });
  }

  showPopup(score: number): void {
    this.scoreInfo.element.innerText = `Your score: ${score} points`;
    this.show();
  }
}
