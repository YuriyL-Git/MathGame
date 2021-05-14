import { BaseComponent } from '../application/base-component';
import './_cards-field.scss';
import { Card } from '../card/card';
import Settings from '../application/settings';

const SHOW_TIME = 3;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('section', ['cards-field']);
  }

  clearField(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  setupField(): void {
    const fieldHeight = this.element.clientHeight;
    const gridColumns = Math.ceil(Math.sqrt(Settings.imagesQuantity));
    const gridRows = Settings.imagesQuantity / gridColumns;
    const cardSize = (fieldHeight - gridRows * (20 - gridRows)) / gridRows;

    const rowGap = (fieldHeight - cardSize * gridRows) / (gridRows - 1);
    const fieldWidht = cardSize * gridColumns + rowGap * (gridColumns - 1) - 20;

    Settings.cardSize = `${cardSize}px`;

    /* setup card-field width */
    this.element.style.width = `${fieldWidht}px`;

    /* setup grid-template columns */
    this.element.style.gridTemplateColumns = `repeat(
      ${gridColumns}, 1fr)`;
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach(card => {
      this.element.appendChild(card.element);
    });
    setTimeout(async () => {
      await this.flipCardsToBack();
    }, SHOW_TIME * 1000);
  }

  async flipCardsToBack(): Promise<void> {
    await Promise.all(this.cards.map(card => card.flipToBack()));
  }
}
