import { Component } from '../shared/component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay, getImagesList } from '../shared/helper-functions';
import Settings from '../../settings';

const FLIP_BACK_DELAY = 600;
const ANIMATION_DELAY = 200;

export class GameController extends Component {
  private readonly cardsField: CardsField;

  private activeCard: Card | null = null;

  private isAnimation = false;

  private gameIsStarted = false;

  private imageList: string[] = [];

  private cards?: Card[];

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

  async createGame(): Promise<void> {
    this.isAnimation = false;
    this.activeCard = null;
    await this.updateImageList();
    this.cardsField.setupField();

    this.cards = this.imageList.map(
      image => new Card(image, Settings.cardSize),
    );

    this.cards.forEach(card =>
      card.element.addEventListener('click', () => {
        this.cardClickHandler(card).catch(err => new Error(err));
      }),
    );

    this.cardsField.addCards(this.cards);
  }

  async startGame(): Promise<void> {
    this.cardsField.flipCardsToBack();
    // TODO if no cards are turned skip following delay
    await delay(ANIMATION_DELAY);
    await this.createGame();
    await delay(ANIMATION_DELAY);
    this.cardsField.flipCardsToFront();
    this.gameIsStarted = true;
  }

  private async cardClickHandler(card: Card) {
    if (!this.gameIsStarted) return;
    if (this.isAnimation) return;
    if (!card.backIsShown) return;
    this.isAnimation = true;

    card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(FLIP_BACK_DELAY);
      this.activeCard.flipToBack();
      card.flipToBack();
    }
    this.activeCard = null;
    this.isAnimation = false;
  }
}
