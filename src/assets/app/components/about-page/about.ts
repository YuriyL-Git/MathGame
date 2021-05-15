import './_about.scss';
import { ComponentClass } from '../shared/component-class';
import { aboutTemplate } from './about-template';

export class About extends ComponentClass {
  constructor() {
    super('div', ['about__wrapper']);
    this.element.innerHTML = aboutTemplate;
  }
}
