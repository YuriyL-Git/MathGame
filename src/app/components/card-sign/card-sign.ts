import './_card-sign.scss';
import { Component } from '../shared/component';

export class CardSign extends Component {
  constructor(signType: 'success' | 'fail') {
    super('div', ['circle', `circle__sign--${signType}`]);
    const circle = new Component('div', ['circle__sign']);
    this.element.append(circle.element);
    this.hide();
  }
}
