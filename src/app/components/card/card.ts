import { Component } from '../shared/component';
import './_card.scss';

const FLIP_TO_BACK_CLASS = 'card-container__card-on-back';

export class Card extends Component {
  backIsShown = true;

  constructor(readonly image: string, size = '10rem') {
    super('div', ['card-container', FLIP_TO_BACK_CLASS]);

    this.element.innerHTML = `
     <div class="card" style="height: ${size}; width: ${size}">
       <div class="card__front" style="background-image: url('${image}')"></div>
       <div class="card__back"></div>
     </div>
    `;
  }

  flipToBack(): void {
    this.backIsShown = true;
    this.element.classList.add(FLIP_TO_BACK_CLASS);
  }

  flipToFront(): void {
    this.backIsShown = false;
    this.element.classList.remove(FLIP_TO_BACK_CLASS);
  }
}
