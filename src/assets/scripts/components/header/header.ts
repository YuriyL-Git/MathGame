import './_header.scss';
import { Component } from '../application/component';
import { headerTemplate } from './header-template';

export class Header extends Component {
  private btnRegister: Component;

  constructor(timer: HTMLElement) {
    super('header', ['header']);

    /* create register new player button */
    const btnWrapper = new Component('div', ['header__btn-wrapper']);
    this.btnRegister = new Component('button', ['header__btn-register']);
    this.btnRegister.element.append('Register new player');
    btnWrapper.element.append(this.btnRegister.element);

    /* append button and timer */
    this.element.append(headerTemplate(), timer, btnWrapper.element);
  }
}
