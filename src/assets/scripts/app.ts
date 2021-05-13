import { GameController } from './components/game-controller/game-controller';
import { Header } from './components/header/header';

export class App {
  public readonly game: GameController;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new GameController();
    const header = new Header();
    this.rootElement.appendChild(header.element);
    this.rootElement.appendChild(this.game.element);
  }
}
