import './_header.scss';
import { BaseComponent } from '../application/base-component';
import { headerTemplate } from './header-template';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = headerTemplate;
  }
}
