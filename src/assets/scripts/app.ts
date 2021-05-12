import { Game } from './components/game/game';
import Settings from './components/settings';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  start(): void {
    const settings = new Settings('unsorted', 4);
    settings.imageList
      .then(images => this.game.newGame(images))
      .catch(err => new Error(err));
  }
}
