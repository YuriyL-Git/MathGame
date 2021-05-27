import './_header.scss';
import { Component } from '../shared/component';
import { headerTemplate } from './header-template';
import { Timer } from '../timer/timer';
import { ButtonLink } from '../shared/button-link';
import { Button } from '../shared/button';
import Settings from '../../settings/settings';

export class Header extends Component {
  private readonly btnRegister: ButtonLink;

  public btnStartNewGame: Button;

  private avatarWrapper: Component;

  public btnStopGame: Button;

  public timer: Timer;

  private linkTitles: NodeListOf<Element>;

  private gameLink: HTMLElement | null;

  private navList: HTMLElement | null;

  constructor() {
    super('header', ['header']);
    this.timer = new Timer();

    /* create header buttons */
    const btnWrapper = new Component('div', ['header__btn-wrapper']);
    this.avatarWrapper = new Component('div', ['header__avatar-wrapper']);

    this.btnRegister = new ButtonLink(
      ['header__btn'],
      'Register new player',
      '#register',
    );

    this.btnStartNewGame = new Button(
      ['header__btn', 'header__btn--green'],
      'NEW GAME',
    );
    this.btnStopGame = new Button(
      ['header__btn', 'header__btn--red'],
      'STOP GAME',
    );

    this.btnStartNewGame.hide();
    this.btnStopGame.hide();

    btnWrapper.element.append(
      this.btnRegister.element,
      this.btnStartNewGame.element,
      this.btnStopGame.element,
      this.avatarWrapper.element,
    );

    this.element.append(
      headerTemplate(),
      this.timer.element,
      btnWrapper.element,
    );
    this.linkTitles = this.element.querySelectorAll('.header__link-title');
    this.navList = this.element.querySelector(
      '.header__nav-list',
    ) as HTMLElement;
    this.gameLink = this.element.querySelector('.item-game') as HTMLElement;
  }

  showNewGameOption(): void {
    this.showUser();
    this.showNewGameBtn();
  }

  showNewGameBtn(): void {
    this.btnStartNewGame.show();
    this.btnRegister.hide();
    this.btnStopGame.hide();
  }

  showStopGameBtn(): void {
    this.btnStartNewGame.hide();
    this.btnStopGame.show();
  }

  showGameLink(): void {
    if (this.gameLink) this.gameLink.style.display = 'block';
    if (this.navList) this.navList.style.maxWidth = '35rem';
  }

  showUser(): void {
    const img = new Image();
    img.classList.add('header__avatar');

    if (Settings.user?.avatar !== 'none' && Settings.user?.avatar) {
      img.src = Settings.user?.avatar;
    } else {
      img.src = './icons/avatar.png';
    }

    this.avatarWrapper.element.append(img);
  }

  highlightLink(linkText: string): void {
    this.linkTitles.forEach(title => {
      title.classList.remove('header__link-selected');

      if (title.innerHTML === linkText) {
        title.classList.add('header__link-selected');
      }
    });
  }
}
