import { BaseComponent } from '../base-component';
import './_card.scss';

const FLIP_CLASS = 'card-container__flipped';

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
     <div class="card">
       <div class="card__front" style='background-image: url('./img/${image}')">Front</div>
       <div class="card__back">Back</div>
     </div>
    `;
  }

  flipToBack() {
    return this.flip(true);
  }

  flipToFront() {
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise(resolve => {
      this.element.classList.toggle(FLIP_CLASS, !isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
