import { Component } from '../shared/component';
import './_card.scss';

const FLIP_TO_BACK_CLASS = 'card-container__card-on-back';

export class Card extends Component {
  backIsShown = false;

  constructor(readonly image: string, size = '10rem') {
    super('div', ['card-container']);

    this.element.innerHTML = `
     <div class="card" style="height: ${size}; width: ${size}">
       <div class="card__front" style="background-image: url('${image}')"></div>
       <div class="card__back"></div>
     </div>
    `;
  }

  flipToBack(): Promise<void> {
    this.backIsShown = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.backIsShown = false;
    return this.flip(false);
  }

  private flip(frontIsShown = false): Promise<void> {
    return new Promise(resolve => {
      /* if front is not shown remove flip-to-back class
       * else add flip to back class */
      this.element.classList.toggle(FLIP_TO_BACK_CLASS, frontIsShown);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
