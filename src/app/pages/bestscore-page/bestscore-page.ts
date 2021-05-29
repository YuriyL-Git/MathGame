import './_bestscore-page.scss';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';
import { TopPlayer } from '../../components/top-player/top-player';
import { User } from '../../models/user';

const TITLE_HEIGHT = 120;
const PLAYERS_TO_SHOW = 10;
const TITLE = 'Top players';
const NO_PLAYERS_TITLE = 'There is no one to show yet';
const NO_PLAYERS_MESSAGE = 'Register and start playing to be the first!';
const MOCK_MESSAGE = 'To load mock users for testing click on the ';

const EMPTY_PLAYER: User = {
  avatar: 'none',
  firstName: NO_PLAYERS_TITLE,
  lastName: '',
  email: NO_PLAYERS_MESSAGE,
  passwordHash: '',
  score: 0,
};

export class BestscorePage extends Component {
  private page: Component;

  private db: Indexdb;

  private title: Component;

  private mockLink?: HTMLAnchorElement;

  constructor(db: Indexdb) {
    super('div', ['bestscore__wrapper']);
    this.page = new Component('div', ['bestscore__page']);
    this.title = new Component('div', ['bestscore__title']);

    this.page.element.append(this.title.element);
    this.element.append(this.page.element);

    this.db = db;
    this.hide();
  }

  updateTitle(): void {
    this.title.element.innerText = TITLE;
    this.page.element.append(this.title.element);
  }

  updatePlayerRowHeight(): void {
    const root = document.documentElement;
    const windowHeight = this.page.element.clientHeight;
    const playerHeight = (windowHeight - TITLE_HEIGHT) / PLAYERS_TO_SHOW;
    root.style.setProperty('--player-row-height', `${playerHeight}px`);
  }

  refreshPlayers(): void {
    this.page.element.innerHTML = '';
    this.updateTitle();
    this.updatePlayerRowHeight();

    this.db
      .getTopPlayers()
      .then(players => {
        if (players.length === 0) {
          this.showNoPlayersMessage();
        }
        if (players.length < 2) {
          this.showMockMessage();
          this.loadMocksOnClick();
        }

        let position = 0;
        players.forEach(player => {
          position++;
          const playerComponent = new TopPlayer(player, position);
          this.page.element.append(playerComponent.element);
        });
      })
      .catch(err => new Error(err));
  }

  showMockMessage(): void {
    const mockMessage = new Component('div', ['bestscore__mocks']);
    mockMessage.element.innerHTML = MOCK_MESSAGE;

    this.mockLink = document.createElement('a');
    this.mockLink.innerText = 'link';
    this.mockLink.href = '#bestscore';

    mockMessage.element.append(this.mockLink);
    this.page.element.append(mockMessage.element);
  }

  showNoPlayersMessage(): void {
    const emptyPlayer = new TopPlayer(EMPTY_PLAYER, 1);
    emptyPlayer.hideScoreAndPosition();
    this.page.element.append(emptyPlayer.element);
  }

  loadMocksOnClick(): void {
    this.mockLink?.addEventListener('click', () => {
      this.db.loadMockData();
    });
  }
}
