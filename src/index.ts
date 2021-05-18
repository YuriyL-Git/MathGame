import './assets/SCSS/style.scss';
import { App } from './app/app';
import { Router } from './app/components/router/router';

window.onload = async () => {
  const appBody = document.body;
  const app = new App(appBody);
  const router = new Router(app);
  router.start();

  await app.start();
};
