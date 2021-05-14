import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';
import { FormRegister } from './components/form-register/form-register';

export class App {
  public readonly game: GameController;

  private header: Header;

  private form: FormRegister;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new GameController();
    this.header = new Header();
    this.form = new FormRegister();
    this.form.hide();
    // this.game.hide();

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.form.element);
  }

  async start(): Promise<void> {
    // TODO implement application functionality
    await this.game.newGame();
  }
}
