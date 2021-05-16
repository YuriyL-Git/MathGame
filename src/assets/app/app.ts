import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Timer } from './components/timer/timer';

export class App {
  public readonly game: GameController;

  public header: Header;

  public form: FormRegister;

  public about: About;

  public timer: Timer;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new GameController();
    this.timer = new Timer();
    this.header = new Header(this.timer);
    this.form = new FormRegister();
    this.form.start();
    this.about = new About();

    // this.header.hide();
    // this.form.hide();
    //  this.game.hide();
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
  }

  async start(): Promise<void> {
    // TODO implement shared functionality
    await this.game.newGame();
  }
}
