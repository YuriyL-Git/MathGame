import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Indexdb } from './components/indexdb/indexdb';
import Settings from './settings';

export class App {
  public readonly game: GameController;

  public header: Header;

  public formRegister: FormRegister;

  public about: About;

  readonly db: Indexdb;

  constructor(private readonly rootElement: HTMLElement) {
    this.about = new About();
    this.db = new Indexdb();
    this.header = new Header();
    this.game = new GameController(this.header, this.db);
    this.formRegister = new FormRegister(this.db);

    this.rootElement.append(
      this.header.element,
      this.about.element,
      this.game.element,
      this.formRegister.element,
    );

    /* wait until new user is created */
    this.formRegister.element.addEventListener('userAdded', () => {
      this.header.showNewGameOption();
      this.showGame();
      Settings.user = this.formRegister.getUser();
    });

    this.formRegister.btnCancel?.addEventListener('click', () => {
      this.about.show();
    });

    this.header.btnStartNewGame.element.addEventListener('click', () => {
      this.startGame();
      this.header.showStopGameBtn();
    });

    this.header.btnStopGame.element.addEventListener('click', () => {
      this.header.timer.stopTimer();
      this.game.cardsField.flipCardsToBack();
      this.header.showNewGameBtn();
    });
  }

  hideAll(): void {
    this.about.hide();
  }

  startGame(): void {
    this.hideAll();
    this.game.show();
    this.game
      .startGame()
      .then()
      .catch(err => new Error(err));
  }

  showGame(): void {
    this.hideAll();
    this.game.show();
    this.game
      .createGame()
      .then()
      .catch(err => new Error(err));
  }
}
