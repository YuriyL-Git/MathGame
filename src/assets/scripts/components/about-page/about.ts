import './_about.scss';
import { BaseComponent } from '../application/base-component';
import { aboutTemplate } from './about-template';
import { headerTemplate } from '../header/header-template';

export class About extends BaseComponent {
  constructor() {
    super('div', ['about__wrapper']);
    this.element.innerHTML = aboutTemplate;
  }
}
