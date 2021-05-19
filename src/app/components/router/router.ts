import { App } from '../../app';

export class Router {
  private readonly routing = [
    {
      name: 'about',
      render: () => {
        this.hideAll();
        this.app.about.show();
      },
    },
    {
      name: 'register',
      render: () => {
        this.hideAll();
        this.app.form.show();
      },
    },
    {
      name: 'default',
      render: () => this.app.about.show(),
    },
  ];

  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  hideAll(): void {
    this.app.about.hide();
    this.app.game.hide();
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
