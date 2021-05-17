import './assets/SCSS/style.scss';
import { App } from './app/app';
import { Router } from './app/components/router/router';

window.onload = async () => {
  const appElement = document.body;
  const app = new App(appElement);
  const router = new Router(app);
  await app.start();
  router.start();
};
