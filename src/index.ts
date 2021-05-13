import './assets/SCSS/style.scss';
import { App } from './assets/scripts/app';

window.onload = async () => {
  const appElement = document.getElementById('app') as HTMLElement;
  const app = new App(appElement);
  await app.game.newGame();
};
