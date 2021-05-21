import { Component } from '../shared/component';
import './_card.scss';
import { delay } from '../shared/helper-functions';

interface Counter {
  success: number;
  fails: number;
  previousCard: Card | null;
}

const FLIP_TO_BACK_CLASS = 'card-container__card-on-back';

const FLIP_BACK_DELAY = 600;

export class Card extends Component {
  private backIsShown = true;

  private animationInProcess = false;

  public isSecondOpened = false;

  constructor(readonly image: string, size = '10rem') {
    super('div', ['card-container', FLIP_TO_BACK_CLASS]);

    this.element.innerHTML = `
     <div class="card" style="height: ${size}; width: ${size}">
       <div class="card__front" style="background-image: url('${image}')"></div>
       <div class="card__back"></div>
     </div>
    `;
  }

  flipToBack(callback: () => void): void {
    this.backIsShown = true;
    this.element.addEventListener('transitionend', callback);
    this.element.classList.add(FLIP_TO_BACK_CLASS);
  }

  flipToFront(): void {
    this.backIsShown = false;
    this.element.classList.remove(FLIP_TO_BACK_CLASS);
  }

  public async clickHandler(
    counter: Counter,
    gameIsStarted: boolean,
  ): Promise<void> {
    if (!gameIsStarted) return;

    if (!this.backIsShown || this.animationInProcess) return;
    if (counter.previousCard?.isSecondOpened) return;
    if (counter.previousCard === this) return;
    this.flipToFront();

    if (!counter.previousCard) {
      counter.previousCard = this;
      return;
    }
    counter.previousCard.isSecondOpened = true;

    if (this.image !== counter.previousCard.image) {
      const previous = counter.previousCard;
      previous.animationInProcess = true;
      this.animationInProcess = true;

      await delay(FLIP_BACK_DELAY);
      previous.flipToBack(previous.animationEnd.bind(previous));
      this.flipToBack(this.animationEnd.bind(this));
      counter.fails += 2;
    } else {
      this.isSecondOpened = false;
      counter.success += 2;
    }
    counter.previousCard = null;
  }

  animationEnd(): void {
    if (this.backIsShown) {
      this.isSecondOpened = false;
      this.animationInProcess = false;
    }
  }
}
