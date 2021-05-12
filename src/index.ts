import './assets/SCSS/style.scss';
import { App } from './assets/scripts/app';

window.onload = () => {
  const appElement = document.getElementById('app') as HTMLElement;
  new App(appElement).start();
};
