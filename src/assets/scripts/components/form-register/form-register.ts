import { formTemplate } from './form-template';
import './_register-form.scss';
import { BaseComponent } from '../application/base-component';

export class FormRegister extends BaseComponent {
  constructor() {
    super('div', ['form-wrapper']);
    this.element.innerHTML = formTemplate;
  }
}
