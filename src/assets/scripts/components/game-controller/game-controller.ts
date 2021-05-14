import { BaseComponent } from '../application/base-component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay, getImagesList } from '../application/helper-functions';
import Settings from '../application/settings';

const FLIP_BACK_DELAY = 800;

export class GameController extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private imageList: string[] = [];

  constructor() {
    super('div', ['field-container']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  async updateImageList(): Promise<void> {
    this.imageList = await getImagesList(
      Settings.imagesCategory,
      Settings.imagesQuantity,
    );
  }

  async newGame(): Promise<void> {
    await this.updateImageList();
    this.cardsField.clearField();
    this.cardsField.setupField();

    const cards = this.imageList.map(
      image => new Card(image, Settings.cardSize),
    );

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
