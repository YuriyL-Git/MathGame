import './_about.scss';
import { Component } from '../shared/component';
import { aboutTemplate } from './about-template';

export class About extends Component {
  constructor() {
    super('div', ['about__wrapper']);
    this.element.innerHTML = aboutTemplate;
    this.hide();
  }
}
