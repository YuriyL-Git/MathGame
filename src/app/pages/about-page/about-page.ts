import './_about-page.scss';
import { Component } from '../../components/shared/component';
import { aboutTemplate } from './about-template';

export class AboutPage extends Component {
  constructor() {
    super('div', ['about__wrapper']);
    this.element.innerHTML = aboutTemplate;
    this.hide();
  }
}
