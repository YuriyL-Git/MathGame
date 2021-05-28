import { Component } from '../shared/component';
import './_cards-field.scss';
import { Card } from '../card/card';
import Settings from '../../settings/settings';

export class CardsField extends Component {
  private cards: Card[] = [];

  private showCardsTimer = 0;

  constructor() {
    super('section', ['cards-field']);
  }

  clearField(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  setupField(): void {
    this.clearField();
    const gridColumns = Math.ceil(Math.sqrt(Settings.imagesQuantity));
    const gridRows = Settings.imagesQuantity / gridColumns;

    const fieldHeight = this.element.clientHeight;
    const cardSize = (fieldHeight - gridRows * (20 - gridRows)) / gridRows;

    const rowGap = (fieldHeight - cardSize * gridRows) / (gridRows - 1);
    const fieldWidth = cardSize * gridColumns + rowGap * (gridColumns - 1) - 20;

    Settings.cardSize = cardSize;

    /* setup cards-field width and grid-template columns */
    this.element.style.width = `${fieldWidth}px`;
    this.element.style.gridTemplateColumns = `repeat(
      ${gridColumns}, 1fr)`;
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach(card => {
      this.element.appendChild(card.element);
    });
  }

  flipCardsToFront(): void {
    this.cards.map(card => card.flipToFront());
    this.showCardsTimer = setTimeout(() => {
      this.flipCardsToBack();
    }, Settings.showTime);
  }

  flipCardsToBack(): void {
    this.cards.map(card => card.flipToBack(() => {}));
  }

  clearShowCardsTimer(): void {
    clearTimeout(this.showCardsTimer);
  }
}
