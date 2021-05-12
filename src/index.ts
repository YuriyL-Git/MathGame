import './assets/SCSS/style.scss';
import { App } from './assets/scripts/app';

window.onload = async () => {
  const appElement = document.querySelector('.app') as HTMLElement;
  await new App(appElement).start();
};
