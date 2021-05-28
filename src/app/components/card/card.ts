import { Component } from '../shared/component';
import './_card.scss';
import { delay } from '../../utils/helper-functions';
import { CardSign } from '../card-sign/card-sign';

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

  public signSuccess: CardSign;

  public signFail: CardSign;

  constructor(
    readonly frontImage: string,
    readonly backImage: string,
    size: number,
  ) {
    super('div', ['card-container', FLIP_TO_BACK_CLASS]);
    this.element.innerHTML = `
     <div class="card" style="height: ${size}px; width: ${size}px">
       <div class="card__front" style="background-image: url('${frontImage}')"></div>
       <div class="card__back" style="background-image: url('${backImage}')"></div>
     </div>
    `;

    this.signSuccess = new CardSign('success');
    this.signFail = new CardSign('fail');

    this.element.append(this.signSuccess.element, this.signFail.element);
  }

  flipToBack(callback: () => void): void {
    this.backIsShown = true;
    this.element.addEventListener('transitionend', callback);
    this.element.classList.add(FLIP_TO_BACK_CLASS);
    this.hideSigns();
  }

  flipToFront(): void {
    this.backIsShown = false;
    this.element.classList.remove(FLIP_TO_BACK_CLASS);
  }

  public async clickHandler(
    counter: Counter,
    gameIsStarted: boolean,
  ): Promise<void> {
    if (!gameIsStarted) {
      this.element.dispatchEvent(new CustomEvent('blinknewgame'));
      return;
    }
    if (!this.backIsShown || this.animationInProcess) return;
    if (counter.previousCard?.isSecondOpened) return;
    if (counter.previousCard === this) return;

    this.flipToFront();
    if (!counter.previousCard) {
      counter.previousCard = this;
      return;
    }
    counter.previousCard.isSecondOpened = true;

    if (this.frontImage !== counter.previousCard.frontImage) {
      const previous = counter.previousCard;

      previous.animationInProcess = true;
      this.animationInProcess = true;
      this.signFail.show();
      previous.signFail.show();

      await delay(FLIP_BACK_DELAY);
      previous.flipToBack(previous.animationEnd.bind(previous));
      this.flipToBack(this.animationEnd.bind(this));
      counter.fails += 2;
    } else {
      this.signSuccess.show();
      counter.previousCard.signSuccess.show();

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

  hideSigns(): void {
    this.signFail.hide();
    this.signSuccess.hide();
  }
}
