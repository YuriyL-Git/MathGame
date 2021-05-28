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
    this.settingsPage = new SettingsPage(this.game, this.db);

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
      this.header.showGameLink();
      Settings.user = this.formRegister.getUser();
      window.location.href = '#game';
    });

    this.header.btnStartNewGame.element.addEventListener('click', () => {
      this.startNewGame();
      this.header.showStopGameBtn();
    });

    this.header.btnStopGame.element.addEventListener('click', () => {
      this.game.stopGame();
      this.header.showNewGameBtn();
    });
  }

  startNewGame(): void {
    this.game.show();
    this.header.highlightLink('Game');
    this.game
      .startNewGame()
      .then()
      .catch(error => new Error(error));
  }
}
