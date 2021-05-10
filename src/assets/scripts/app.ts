import { Game } from './components/game/game';
import { ImageCategoryModel } from '../../models/image-category-model';
import res from '../../../public/images.json';

export class App {
  // private readonly rootElement: HTMLElement;

  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    // this.rootElement = element;
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start() {
    // const res = await fetch('./images.json');
    console.log(res);
    const categories: ImageCategoryModel[] = res;
    const category = categories[0];

    const images = category.images.map(name => `${category.category}/${name}`);
    this.game.newGame(images);
  }
}
