import { formTemplate } from './form-template';
import './_register-form.scss';
import { ComponentClass } from '../shared/component-class';

export class FormRegister extends ComponentClass {
  constructor() {
    super('div', ['form-wrapper']);
    this.element.innerHTML = formTemplate;
    this.hide();
  }
}
