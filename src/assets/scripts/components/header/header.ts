import './_header.scss';
import { BaseComponent } from '../application/base-component';

const headerTemplate = `

`;

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = headerTemplate;
  }
}
