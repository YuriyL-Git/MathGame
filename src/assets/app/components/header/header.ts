import './_header.scss';
import { ComponentClass } from '../shared/component-class';
import { headerTemplate } from './header-template';
import { Timer } from '../timer/timer';
import { Button } from '../shared/button-class';

export class Header extends ComponentClass {
  private readonly btnRegister: Button;

  private btnStartNewGame: Button;

  constructor(timer: Timer) {
    super('header', ['header']);

    /* create header buttons */
    const btnsWrapper = new ComponentClass('div', ['header__btn-wrapper']);

    this.btnRegister = new Button(
      ['header__btn', 'btn-register'],
      'Register new player',
      '#register',
    );

    this.btnStartNewGame = new Button(
      ['header__btn', 'btn-new-game'],
      'New Game',
      '#newgame',
    );

    // this.btnStartNewGame.hide();
    this.btnRegister.hide();

    btnsWrapper.element.append(
      this.btnRegister.element,
      this.btnStartNewGame.element,
    );

    /* append button and timer */
    this.element.append(headerTemplate(), timer.element, btnsWrapper.element);
  }
}
