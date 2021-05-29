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

  private userWrapper: Component;

  public btnStopGame: Button;

  public timer: Timer;

  private linkTitles: NodeListOf<Element>;

  private gameLink: HTMLElement | null;

  private navList: HTMLElement | null;

  private btnLogin: ButtonLink;

  private avatar: HTMLImageElement;

  private userName: Component;

  private btnLogout: Button;

  constructor() {
    super('header', ['header']);
    this.timer = new Timer();

    /* ----------------------- login user data -------------------------------- */
    this.userWrapper = new Component('div', ['header__user-wrapper']);
    this.userName = new Component('div', ['header__user-name']);
    this.avatar = new Image();
    this.avatar.classList.add('header__avatar');
    const dropDownWrapper = new Component('div', ['header__drop-down-wrapper']);
    this.btnLogout = new Button(['header__btn-logout'], 'Log Out');
    dropDownWrapper.element.append(this.btnLogout.element);

    this.userWrapper.element.append(
      this.avatar,
      this.userName.element,
      dropDownWrapper.element,
    );
    this.userWrapper.hide();

    this.btnLogout.element.addEventListener('click', () => {
      this.showUserLoggedOut();
    });

    /* -------------  buttons --------------------------------------------------*/
    this.btnRegister = new ButtonLink(
      ['header__btn'],
      'Register new player',
      '#register',
    );

    this.btnLogin = new ButtonLink(
      ['header__btn', 'header__btn-login'],
      'Login',
      '#login',
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

    const btnWrapper = new Component('div', ['header__btn-wrapper']);
    btnWrapper.element.append(
      this.btnLogin.element,
      this.btnRegister.element,
      this.btnStartNewGame.element,
      this.btnStopGame.element,
      this.userWrapper.element,
    );

    this.element.append(
      headerTemplate(),
      this.timer.element,
      btnWrapper.element,
    );

    this.linkTitles = this.element.querySelectorAll('.header__link-title');
    this.navList = this.element.querySelector('.header__nav-list');
    this.gameLink = this.element.querySelector('.item-game') as HTMLElement;
  }

  showUserLoggedIn(): void {
    this.showUser();
    this.showNewGameBtn();
    this.showGameLink();
    this.timer.show();
  }

  showUserLoggedOut(): void {
    Settings.user = null;
    this.userWrapper.hide();
    this.hideAllButtons();
    this.timer.hide();
    this.hideGameLink();
    this.btnRegister.show();
    this.btnLogin.show();
    window.location.href = '#about';
  }

  showNewGameBtn(): void {
    this.hideAllButtons();
    this.btnStartNewGame.show();
  }

  showStopGameBtn(): void {
    this.hideAllButtons();
    this.btnStopGame.show();
  }

  hideAllButtons(): void {
    this.btnStartNewGame.hide();
    this.btnRegister.hide();
    this.btnLogin.hide();
    this.btnStopGame.hide();
  }

  showGameLink(): void {
    if (this.gameLink) this.gameLink.style.display = 'block';
    if (this.navList) this.navList.style.maxWidth = '35rem';
  }

  hideGameLink(): void {
    if (this.gameLink) this.gameLink.style.display = 'none';
    if (this.navList) this.navList.style.maxWidth = '30rem';
  }

  showUser(): void {
    if (Settings.user?.avatar !== 'none' && Settings.user?.avatar) {
      this.avatar.src = Settings.user?.avatar;
    } else {
      this.avatar.src = './icons/avatar.png';
    }

    if (Settings.user) {
      this.userName.element.innerText = `${Settings.user.firstName} ${Settings.user.lastName}`;
    }
    this.userWrapper.show();
  }

  highlightLink(linkText: string): void {
    this.linkTitles.forEach(title => {
      title.classList.remove('header__link-selected');

      if (title.innerHTML === linkText) {
        title.classList.add('header__link-selected');
      }
    });
  }

  blinkNewGameBtn(): void {
    this.btnStartNewGame.element.classList.add('btn_blink');
    this.btnStartNewGame.element.addEventListener('animationend', () => {
      this.btnStartNewGame.element.classList.remove('btn_blink');
    });
  }
}
