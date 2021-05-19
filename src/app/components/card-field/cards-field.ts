import { Component } from '../shared/component';
import './_cards-field.scss';
import { Card } from '../card/card';
import Settings from '../../settings';

export class CardsField extends Component {
  private cards: Card[] = [];

  constructor() {
    super('section', ['cards-field']);
  }

  clearField(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  setupField(): void {
    this.clearField();
    const fieldHeight = this.element.clientHeight;
    const gridColumns = Math.ceil(Math.sqrt(Settings.imagesQuantity));
    const gridRows = Settings.imagesQuantity / gridColumns;
    const cardSize = (fieldHeight - gridRows * (20 - gridRows)) / gridRows;

    const rowGap = (fieldHeight - cardSize * gridRows) / (gridRows - 1);
    const fieldWidth = cardSize * gridColumns + rowGap * (gridColumns - 1) - 20;

    Settings.cardSize = `${cardSize}px`;

    /* setup card-field width */
    this.element.style.width = `${fieldWidth}px`;

    /* setup grid-template columns */
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
    setTimeout(() => {
      this.flipCardsToBack();
    }, Settings.showTime);
  }

  flipCardsToBack(): void {
    this.cards.map(card => card.flipToBack());
  }
}
