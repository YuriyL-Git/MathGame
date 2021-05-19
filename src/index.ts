import './assets/SCSS/style.scss';
import { App } from './app/app';
import { Router } from './app/components/router/router';

window.onload = () => {
  const appBody = document.body;
  const app = new App(appBody);
  const router = new Router(app);
  router.start();
};
