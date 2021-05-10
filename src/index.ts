import './assets/SCSS/style.scss';
import { App } from './assets/scripts/app';

window.onload = () => {
  const appElement = document.querySelector('.app') as HTMLElement;
  if (!appElement) throw Error('Root not found');
  new App(appElement).start();
};
