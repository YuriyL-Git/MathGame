import './_header.scss';
import { Component } from '../shared/component';
import { headerTemplate } from './header-template';
import { Timer } from '../timer/timer';
import { ButtonLink } from '../shared/button-link';
import { Button } from '../shared/button';
import Settings from '../../settings';

export class Header extends Component {
  private readonly btnRegister: ButtonLink;

  public btnStartNewGame: Button;

  private avatarWrapper: Component;

  public btnStopGame: Button;

  public timer: Timer;

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

    this.btnStartNewGame = new Button(['header__btn'], 'New Game');
    this.btnStopGame = new Button(['header__btn'], 'Stop Game');

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
}
