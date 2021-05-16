import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';
import { About } from './components/about-page/about';

export class App {
  public readonly game: GameController;

  private header: Header;

  private form: FormRegister;

  private about: About;

  constructor(private readonly rootElement: HTMLElement) {
    // TODO insert timer element here
    this.game = new GameController();
    this.header = new Header();
    this.header.hide();
    this.form = new FormRegister();
    this.about = new About();
    this.form.hide();
    this.game.hide();
    this.about.hide();

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.about.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.form.element);
  }

  async start(): Promise<void> {
    // TODO implement application functionality
    await this.game.newGame();
  }
}
