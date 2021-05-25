import { GameController } from './game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { AboutPage } from './pages/about-page/about-page';
import { Indexdb } from './servises/indexdb';
import Settings from './settings/settings';
import { Popup } from './components/pop-up/popup';
import { BestscorePage } from './pages/bestscore-page/bestscore-page';
import { SettingsPage } from './pages/settings-page/settings-page';

export class App {
  public game: GameController;

  public header: Header;

  public formRegister: FormRegister;

  public db: Indexdb;

  public bestscorePage: BestscorePage;

  public aboutPage: AboutPage;

  public settingsPage: SettingsPage;

  private readonly popup: Popup;

  constructor(private readonly rootElement: HTMLElement) {
    this.db = new Indexdb();
    this.header = new Header();
    this.popup = new Popup();
    this.game = new GameController(this.header, this.popup, this.db);
    this.formRegister = new FormRegister(this.db);

    this.aboutPage = new AboutPage();
    this.bestscorePage = new BestscorePage(this.db);
    this.settingsPage = new SettingsPage(this.db);

    this.rootElement.append(
      this.header.element,
      this.aboutPage.element,
      this.game.element,
      this.formRegister.element,
      this.popup.element,
      this.bestscorePage.element,
      this.settingsPage.element,
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

  /*  hideAll(): void {
    this.aboutPage.hide();
  } */

  startGame(): void {
    // this.hideAll();
    this.game.show();
    this.game
      .startGame()
      .then()
      .catch(error => new Error(error));
  }

  showGame(): void {
    // this.hideAll();
    this.game.show();
    this.game
      .createGame()
      .then()
      .catch(error => new Error(error));
  }
}
