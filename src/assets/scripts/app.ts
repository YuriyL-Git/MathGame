import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';
import { Timer } from './components/timer/timer';

export class App {
  public readonly game: GameController;

  private header: Header;

  private form: FormRegister;

  private about: About;

  private timer: Timer;

  constructor(private readonly rootElement: HTMLElement) {
    // TODO insert timer element here
    this.game = new GameController();
    this.timer = new Timer();
    this.header = new Header(this.timer.element);
    // this.header.hide();
    this.form = new FormRegister();
    this.about = new About();
    this.form.hide();
    this.game.hide();
    this.about.hide();

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.about.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.form.element);

    this.timer.setTimer('0', '12');
    this.timer.startTimer();
    this.timer.element.addEventListener('timerstop', () => {
      console.log('stopped');
    });
  }

  async start(): Promise<void> {
    // TODO implement application functionality
    await this.game.newGame();
  }
}
