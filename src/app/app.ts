import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Timer } from './components/timer/timer';
import { Indexdb } from './components/indexdb/indexdb';

export class App {
  public readonly game: GameController;

  public header: Header;

  public form: FormRegister;

  public about: About;

  public timer: Timer;

  private database: Indexdb;

  constructor(private readonly rootElement: HTMLElement) {
    this.database = new Indexdb();
    this.game = new GameController();
    this.timer = new Timer();
    this.header = new Header(this.timer);
    this.form = new FormRegister(this.database);
    this.about = new About();

    this.rootElement.append(
      this.header.element,
      this.about.element,
      this.game.element,
      this.form.element,
    );

    this.timer.setTimer('0', '12');
    this.timer.startTimer();
    this.timer.element.addEventListener('timerstop', () => {
      console.log('stopped');
    });

    this.form.start();
    /* listen until new user is created */
    this.form.element.addEventListener('userAdded', () => {
      this.header.showBtnNewGame();
    });

    this.header.btnStartNewGame.element.addEventListener('click', () => {
      this.game.show();
      this.game.newGame().catch(() => {
        throw new Error('Failed to start game');
      });
    });
  }
}
