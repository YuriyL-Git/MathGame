import { formTemplate } from './form-template';
import './_register-form.scss';
import { Component } from '../application/component';

export class FormRegister extends Component {
  constructor() {
    super('div', ['form-wrapper']);
    this.element.innerHTML = formTemplate;
  }
}
