import { Game } from './components/game/game';
import { ImageCategoryModel } from '../../models/image-category-model';

// import resources from '../../../public/images.json';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start() {
    // const categories: ImageCategoryModel[] = resources;

    const res = await fetch('./images.json');
    console.log(res);
    const categories: ImageCategoryModel[] = await res.json();
    const category = categories[0];

    const images = category.images.map(
      // name => `./images/${category.category}/${name}`,
      name => `./${category.category}/${name}`,
    );
    this.game.newGame(images);
  }
}
