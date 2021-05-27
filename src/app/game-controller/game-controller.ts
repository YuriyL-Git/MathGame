import { Component } from '../components/shared/component';
import { Card } from '../components/card/card';
import { CardsField } from '../components/card-field/cards-field';
import { delay, getImagesList } from '../utils/helper-functions';
import Settings from '../settings/settings';
import { Indexdb } from '../servises/indexdb';
import { Header } from '../components/header/header';
import { Popup } from '../components/pop-up/popup';

const ANIMATION_DELAY = 200;
const MILLISECONDS_IN_SECOND = 1000;

export class GameController extends Component {
  public cardsField: CardsField;

  public gameIsStarted = false;

  private imageList: Array<string> = [];

  private cards: Array<Card> = [];

  public counter = {
    success: 0,
    fails: 0,
    previousCard: null as Card | null,
  };

  private db: Indexdb;

  private header: Header;

  private popup: Popup;

  constructor(header: Header, popup: Popup, db: Indexdb) {
    super('div', ['field-container']);
    this.header = header;
    this.popup = popup;
    this.db = db;
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  async updateImageList(): Promise<void> {
    this.imageList = await getImagesList(
      Settings.currentCategory,
      Settings.imagesQuantity,
    );
  }

  async createGame(): Promise<void> {
    await this.updateImageList();

    this.cardsField.setupField();
    this.cards = this.imageList.map(
      image => new Card(image, Settings.cardCoverImage, Settings.cardSize),
    );
    this.cards.forEach(card =>
      card.element.addEventListener('click', () => {
        card
          .clickHandler(this.counter, this.gameIsStarted)
          .catch(err => new Error(err));
        if (this.counter.success === this.cards.length && this.gameIsStarted)
          this.userWin();
      }),
    );
    this.cardsField.addCards(this.cards);
  }

  async startGame(): Promise<void> {
    this.counter = {
      success: 0,
      fails: 0,
      previousCard: null as Card | null,
    };
    this.cardsField.flipCardsToBack();

    await delay(ANIMATION_DELAY);
    await this.createGame();

    await delay(ANIMATION_DELAY);
    this.cardsField.flipCardsToFront();

    this.header.timer.startCountDown(
      Settings.showTime / MILLISECONDS_IN_SECOND,
    );
    this.gameIsStarted = true;
  }

  private getScore(): number {
    const res =
      (this.counter.success - this.counter.fails / 5) * 100 -
      this.header.timer.currentTime * 10;
    return res > 0 ? Math.ceil(res / 10) * 10 : 0;
  }

  private userWin(): void {
    this.gameIsStarted = false;
    this.popup.showPopup(this.getScore());
    this.header.timer.stopTimer();
    this.header.showNewGameBtn();

    if (Settings.user && this.getScore() > Settings.user.score) {
      Settings.user.score = this.getScore();
      this.db.updateRecord(Settings.user);
    }
  }
}
