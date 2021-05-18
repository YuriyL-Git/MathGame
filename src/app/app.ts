import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Timer } from './components/timer/timer';
import { Indexdb } from './components/indexdb/indexdb';

import { UserData } from './models/user-data';

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
    this.form.start();
    this.about = new About();
    this.about.hide();

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
    const data: UserData = {
      firstName: 'yy',
      lastName: 'yy',
      email: '1malak16@gmail.com',
      score: 8,
    };

    setTimeout(() => {
      this.database.updateRecord(data);
    }, 2000);
  }

  async start(): Promise<void> {
    // TODO implement shared functionality
    await this.game.newGame();
    const users = await this.database.getTopPlayers();
    console.log(users);
  }
}
