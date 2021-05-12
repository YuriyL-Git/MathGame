import { Game } from './components/game/game';
import Settings from './components/application/settings';
import { Header } from './components/header/header';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    const header = new Header();
    this.rootElement.appendChild(header.element);
    this.rootElement.appendChild(this.game.element);
  }

  start(): void {
    if (Settings.imageList) {
      Settings.imageList
        .then(images => this.game.newGame(images))
        .catch(err => new Error(err));
    }
  }
}
