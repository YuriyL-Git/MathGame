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

const CALCULATE_SCORE_FORMULA = (
  successfulCompars: number,
  failCompars: number,
  spentTime: number,
  cardsQty: number,
): number => {
  const failPenaltyRate = Math.floor(Math.sqrt(cardsQty));
  const successOffsetRate = cardsQty / 10;
  const result =
    (Math.ceil(successfulCompars * successOffsetRate) -
      Math.floor(failCompars / failPenaltyRate)) *
      100 -
    spentTime * 10;

  return result > 0 ? result : 0;
};

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
    this.resetValues();

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
        console.log('score=', this.getScore());
      }),
    );
    this.cardsField.addCards(this.cards);
    this.gameIsStarted = false;
  }

  resetValues(): void {
    this.counter = {
      success: 0,
      fails: 0,
      previousCard: null as Card | null,
    };
  }

  async startNewGame(): Promise<void> {
    this.stopGame();

    await delay(ANIMATION_DELAY);
    await this.createGame();

    await delay(ANIMATION_DELAY);
    this.cardsField.flipCardsToFront();

    this.header.timer.startCountDown(
      Settings.showTime / MILLISECONDS_IN_SECOND,
    );
    this.gameIsStarted = true;
  }

  public stopGame(): void {
    this.header.timer.resetTimer();
    this.header.showNewGameBtn();
    this.resetValues();
    this.cardsField.flipCardsToBack();
    this.cardsField.clearShowCardsTimer();
    this.gameIsStarted = false;
  }

  private getScore(): number {
    return CALCULATE_SCORE_FORMULA(
      this.counter.success,
      this.counter.fails,
      this.header.timer.currentTime,
      this.cards.length,
    );
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
