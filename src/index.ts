import './assets/SCSS/style.scss';
import { App } from './assets/scripts/app';

window.onload = async () => {
  const appElement = document.getElementById('app') as HTMLElement;
  await new App(appElement).start();
};
