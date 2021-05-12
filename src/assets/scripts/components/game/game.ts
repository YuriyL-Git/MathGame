import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay } from '../../shared/delay';

const FLIP_DELAY = 800;

export class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
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
        this.cardHandler(card).catch(err => new Error(err));
      }),
    );

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
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
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
