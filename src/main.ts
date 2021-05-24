import './assets/scss/style.scss';
import { App } from './app/app';
import { Router } from './app/servises/router/router';

const appBody = document.body;

window.onload = () => {
  const app = new App(appBody);
  const router = new Router(app);
  router.start();
};
