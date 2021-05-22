import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Timer } from './components/timer/timer';
import { Indexdb } from './components/indexdb/indexdb';

export class App {
  public readonly game: GameController;

  public header: Header;

  public formRegister: FormRegister;

  public about: About;

  public timer: Timer;

  private database: Indexdb;

  constructor(private readonly rootElement: HTMLElement) {
    this.database = new Indexdb();
    this.game = new GameController();
    this.timer = new Timer();
    this.header = new Header(this.timer);
    this.formRegister = new FormRegister(this.database);
    this.about = new About();

    this.rootElement.append(
      this.header.element,
      this.about.element,
      this.game.element,
      this.formRegister.element,
    );

    /*  this.timer.setTimer('0', '12');
    this.timer.startTimer();
    this.timer.element.addEventListener('timerstop', () => {
      console.log('stopped');
    }); */

    // this.form.start();
    /* listen until new user is created */
    this.formRegister.element.addEventListener('userAdded', () => {
      this.header.showBtnNewGame();
      this.header.showUser();
      this.hideAll();
      this.game
        .createGame()
        .then()
        .catch(err => new Error(err));
      this.game.show();
    });

    this.formRegister.btnCancel?.addEventListener('click', () => {
      // this.about.show();
    });

    this.header.btnStartNewGame.element.addEventListener('click', () => {
      this.hideAll();

      this.game.show();
      this.game
        .startGame()
        .then()
        .catch(err => new Error(err));
    });
  }

  hideAll(): void {
    this.about.hide();
  }
}
