import { App } from '../app';
import Settings from '../settings/settings';

export class Router {
  private readonly routing = [
    {
      name: 'about',
      render: () => {
        this.hideAll();
        this.app.about.show();
        this.app.header.highlightLink('About');
      },
    },
    {
      name: 'register',
      render: () => {
        this.hideAll();
        this.app.formRegister.show();
        this.app.header.highlightLink('none');
      },
    },
    {
      name: 'bestscore',
      render: () => {
        this.hideAll();
        this.app.bestscore.show();
        this.app.bestscore.refreshPlayers();
        this.app.header.highlightLink('Best Score');
      },
    },
    {
      name: 'settings',
      render: () => {
        this.hideAll();
        this.app.header.highlightLink('Settings');
      },
    },
    {
      name: 'game',
      render: () => {
        if (Settings.user) {
          this.hideAll();
          this.app.showGame();
          this.app.header.highlightLink('none');
        }
      },
    },
    {
      name: 'default',
      render: () => {
        this.hideAll();
        this.app.about.show();
        this.app.header.highlightLink('About');
      },
    },
  ];

  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  hideAll(): void {
    this.app.about.hide();
    this.app.game.hide();
    this.app.formRegister.hide();
    this.app.bestscore.hide();
  }

  start(): void {
    window.onpopstate = () => {
      const getRoute = window.location.hash.slice(1);
      let currentRoute = this.routing.find(route => route.name === getRoute);
      if (!currentRoute)
        currentRoute = this.routing.find(route => route.name === 'default');
      if (currentRoute) currentRoute.render();
    };
    this.routing[0].render();
  }
}
