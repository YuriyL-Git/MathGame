import { GameController } from './game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './pages/about/about';
import { Indexdb } from './servises/indexdb';
import Settings from './settings/settings';
import { Popup } from './components/pop-up/popup';
import { BestscorePage } from './pages/bestscore/bestscore';

export class App {
  public game: GameController;

  public header: Header;

  public formRegister: FormRegister;

  public about: About;

  public db: Indexdb;

  public bestscore: BestscorePage;

  private readonly popup: Popup;

  constructor(private readonly rootElement: HTMLElement) {
    this.about = new About();
    this.db = new Indexdb();
    this.header = new Header();
    this.popup = new Popup();
    this.game = new GameController(this.header, this.popup, this.db);
    this.formRegister = new FormRegister(this.db);
    this.bestscore = new BestscorePage(this.db);

    this.rootElement.append(
      this.header.element,
      this.about.element,
      this.game.element,
      this.formRegister.element,
      this.popup.element,
      this.bestscore.element,
    );

    /* wait until new user is created */
    this.formRegister.element.addEventListener('userAdded', () => {
      this.header.showNewGameOption();
      this.showGame();
      Settings.user = this.formRegister.getUser();
    });

    this.header.btnStartNewGame.element.addEventListener('click', () => {
      this.startGame();
      this.header.showStopGameBtn();
    });

    this.header.btnStopGame.element.addEventListener('click', () => {
      this.header.timer.stopTimer();
      this.game.cardsField.flipCardsToBack();
      this.game.gameIsStarted = false;
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
