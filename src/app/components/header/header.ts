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

  constructor(timer: Timer) {
    super('header', ['header']);

    /* create header buttons */
    const btnWrapper = new Component('div', ['header__btn-wrapper']);
    this.avatarWrapper = new Component('div', ['header__avatar-wrapper']);
    // this.avatarWrapper.hide();

    this.btnRegister = new ButtonLink(
      ['header__btn', 'btn-register'],
      'Register new player',
      '#register',
    );

    this.btnStartNewGame = new Button(
      ['header__btn', 'btn-new-game'],
      'New Game',
    );

    this.btnStartNewGame.hide();
    //  this.btnRegister.hide();

    btnWrapper.element.append(
      this.btnRegister.element,
      this.btnStartNewGame.element,
      this.avatarWrapper.element,
    );

    this.element.append(headerTemplate(), timer.element, btnWrapper.element);
  }

  showNewGameOption(): void {
    this.showUser();
    this.btnStartNewGame.show();
    this.btnRegister.hide();
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
