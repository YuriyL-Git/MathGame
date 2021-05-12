import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay } from '../helper-functions';

const FLIP_BACK_DELAY = 800;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super('div', ['cards-field-container']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clearField();

    const cards = images
      .concat(images)
      .map(url => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach(card =>
      card.element.addEventListener('click', () => {
        this.cardClickHandler(card).catch(err => new Error(err));
      }),
    );

    this.cardsField.addCards(cards);
  }

  private async cardClickHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(FLIP_BACK_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
