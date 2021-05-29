import { App } from '../app';
import Settings from '../settings/settings';

interface Route {
  name: string;
  render: () => void;
}

export class Router {
  private readonly routes: Array<Route> = [
    {
      name: 'about',
      render: () => {
        this.hideAll();
        this.app.aboutPage.show();
        this.app.header.highlightLink('About');
      },
    },
    {
      name: 'bestscore',
      render: () => {
        this.hideAll();
        this.app.bestscorePage.show();
        this.app.bestscorePage.refreshPlayers();
        this.app.header.highlightLink('Best Score');
      },
    },
    {
      name: 'settings',
      render: () => {
        this.hideAll();
        this.app.settingsPage.show();
        this.app.header.highlightLink('Settings');
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
      name: 'login',
      render: () => {
        this.hideAll();
        this.app.formSingIn.show();
        this.app.header.highlightLink('none');
      },
    },
    {
      name: 'game',
      render: () => {
        if (!Settings.user) return;
        this.hideAll();
        this.app.game.show();
        if (Settings.createNewGame) {
          this.app.game.stopGame();
          this.app.game
            .createGame()
            .then()
            .catch(() => new Error());
          Settings.createNewGame = false;
        }

        this.app.header.highlightLink('Game');
      },
    },
  ];

  private defaultRoute: Route = {
    name: 'default',
    render: () => {
      this.hideAll();
      this.app.aboutPage.show();
      this.app.header.highlightLink('About');
    },
  };

  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  hideAll(): void {
    this.app.aboutPage.hide();
    this.app.bestscorePage.hide();
    this.app.settingsPage.hide();

    this.app.game.hide();
    this.app.formRegister.hide();
    this.app.formSingIn.hide();
  }

  start(): void {
    this.defaultRoute.render();

    window.onpopstate = () => {
      this.getRoute().render();
    };
  }

  getRoute(): Route {
    const routeName = window.location.hash.slice(1);
    let currentRoute = this.routes.find(route => route.name === routeName);
    if (!currentRoute) currentRoute = this.defaultRoute;

    return currentRoute;
  }
}
