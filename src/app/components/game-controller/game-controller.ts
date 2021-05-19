import { Component } from '../shared/component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay, getImagesList } from '../shared/helper-functions';
import Settings from '../../settings';

const FLIP_BACK_DELAY = 600;

export class GameController extends Component {
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
    this.isAnimation = false;
    this.activeCard = undefined;
    await this.updateImageList();
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
    if (!card.backIsShown) return;
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
