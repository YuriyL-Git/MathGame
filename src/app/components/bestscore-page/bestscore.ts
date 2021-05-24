import './_bestscore.scss';
import { Component } from '../shared/component';
import { Indexdb } from '../indexdb/indexdb';
import { Player } from './player';
import { User } from '../../models/user';

const TITLE_HEIGHT = 120;
const PLAYERS_TO_SHOW = 10;
const TITLE = 'Top players';
const NO_PLAYERS_TITLE = 'There is no one to show yet';
const NO_PLAYERS_MESSAGE = 'Register and start playing to be the first!';

const EMPTY_PLAYER: User = {
  avatar: 'none',
  firstName: NO_PLAYERS_TITLE,
  lastName: '',
  email: NO_PLAYERS_MESSAGE,
  score: 0,
};

export class BestscorePage extends Component {
  private page: Component;

  private db: Indexdb;

  private title: Component;

  constructor(db: Indexdb) {
    super('div', ['bestscore__wrapper']);
    this.page = new Component('div', ['bestscore']);
    this.title = new Component('div', ['bestscore__title']);
    this.page.element.append(this.title.element);
    this.element.append(this.page.element);

    this.db = db;
    this.hide();
  }

  refreshPlayers(): void {
    const root = document.documentElement;
    const windowHeight = this.page.element.clientHeight;
    const playerHeight = (windowHeight - TITLE_HEIGHT) / PLAYERS_TO_SHOW;
    root.style.setProperty('--player-row-height', `${playerHeight}px`);

    this.page.element.innerHTML = '';
    this.title.element.innerText = TITLE;
    this.page.element.append(this.title.element);

    this.db
      .getTopPlayers()
      .then(players => {
        if (players.length === 0) {
          const emptyPlayer = new Player(EMPTY_PLAYER, 1);
          this.page.element.append(emptyPlayer.element);
        }
        let position = 0;
        players.forEach(player => {
          position++;
          const playerComponent = new Player(player, position);
          this.page.element.append(playerComponent.element);
        });
      })
      .catch(err => new Error(err));
  }
}
