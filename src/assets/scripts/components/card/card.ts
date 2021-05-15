import { Component } from '../application/component';
import './_card.scss';

const FLIP_CLASS = 'card-container__flipped';

export class Card extends Component {
  isFlipped = false;

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
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise(resolve => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
