import { Component } from '../shared/component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/cards-field';
import { delay, getImagesList } from '../shared/helper-functions';
import Settings from '../../settings';
import { Timer } from '../timer/timer';
import { Indexdb } from '../indexdb/indexdb';
import { Header } from '../header/header';

const ANIMATION_DELAY = 200;

export class GameController extends Component {
  public cardsField: CardsField;

  private gameIsStarted = false;

  private imageList: Array<string> = [];

  private cards: Array<Card> = [];

  private timer: Timer;

  public counter = {
    success: 0,
    fails: 0,
    previousCard: null as Card | null,
  };

  private db: Indexdb;

  private header: Header;

  constructor(header: Header, db: Indexdb) {
    super('div', ['field-container']);
    this.header = header;
    this.timer = header.timer;
    this.db = db;
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
    await this.updateImageList();
    this.cardsField.setupField();
    this.counter = {
      success: 0,
      fails: 0,
      previousCard: null as Card | null,
    };

    this.cards = this.imageList.map(
      image => new Card(image, Settings.cardSize),
    );

    this.cards.forEach(card =>
      card.element.addEventListener('click', () => {
        card
          .clickHandler(this.counter, this.gameIsStarted)
          .catch(err => new Error(err));
        if (this.counter.success === this.cards.length) this.userWin();
      }),
    );

    this.cardsField.addCards(this.cards);
  }

  async startGame(): Promise<void> {
    this.cardsField.flipCardsToBack();
    await delay(ANIMATION_DELAY);
    await this.createGame();
    await delay(ANIMATION_DELAY);
    this.cardsField.flipCardsToFront();
    this.timer.startCountDown(Settings.showTime / 1000);
    this.gameIsStarted = true;
  }

  private getScore(): number {
    // TODO update formula
    return this.counter.success * 100 - this.timer.currentTime * 10;
  }

  private userWin(): void {
    // TODO show pop up window
    this.timer.stopTimer();
    this.header.showNewGameBtn();
    if (Settings.user && this.getScore() > Settings.user.score) {
      Settings.user.score = this.getScore();
      this.db.updateRecord(Settings.user);
    }
  }
}
