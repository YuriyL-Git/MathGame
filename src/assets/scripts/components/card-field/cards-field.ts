import { BaseComponent } from '../base-component';
import './_cards-field.scss';
import { Card } from '../card/card';

const SHOW_TIME = 3;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clearField(): void {
    this.cards = [];
    this.element.innerHTML = '';
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
