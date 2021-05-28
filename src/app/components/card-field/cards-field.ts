import { Component } from '../shared/component';
import './_cards-field.scss';
import { Card } from '../card/card';
import Settings from '../../settings/settings';

const MAXIMUM_CARDS = 40;
const COLUMNS_FOR_MAX_CARDS = 8;
const FIELD_MARGIN = 20;

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
    let gridColumns = Math.ceil(Math.sqrt(Settings.cardsQty));
    /* to optimize field size for big cards quantity */
    if (Settings.cardsQty === MAXIMUM_CARDS) {
      gridColumns = COLUMNS_FOR_MAX_CARDS;
    }

    const gridRows = Settings.cardsQty / gridColumns;
    const fieldHeight = this.element.clientHeight;
    const cardSize =
      (fieldHeight - gridRows * (FIELD_MARGIN - gridRows)) / gridRows;

    const rowGap = (fieldHeight - cardSize * gridRows) / gridRows;
    const fieldWidth =
      cardSize * gridColumns + rowGap * gridColumns - FIELD_MARGIN;

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
