import { formTemplate } from './form-template';
import './_register-form.scss';
import { Component } from '../shared/component';
import { Validator } from './validator';

export class FormRegister extends Component {
  private readonly btnAdd: HTMLButtonElement | null;

  private btnCancel: HTMLButtonElement | null;

  private inputs: NodeListOf<HTMLInputElement>;

  private validator: Validator;

  constructor() {
    super('div', ['form-wrapper']);
    this.element.append(formTemplate());

    this.btnAdd = this.element.querySelector('.register__btn--add');
    this.btnCancel = this.element.querySelector('.register__btn--cancel');
    this.inputs = this.element.querySelectorAll('.register__input');
    this.validator = new Validator();
    // this.hide();
  }

  start(): void {
    this.activateButtons();

    this.inputs.forEach(input => {
      const message = new Component('div', ['validation-message']);
      input.after(message.element);

      input.addEventListener('input', () => {
        message.element.innerText = '';
        input.style.backgroundColor = '#a3f5a3';

        if (!this.validator.isValid(input)) {
          message.element.innerText = this.validator.errorMessage;
          if (this.btnAdd) this.btnAdd.disabled = true;
          input.style.backgroundColor = '#fff';
        }

        if (this.validateAll() && this.btnAdd) this.btnAdd.disabled = false;
      });
    });
  }

  validateAll(): boolean {
    let result = true;
    this.inputs.forEach(input => {
      if (!this.validator.isValid(input)) result = false;
    });
    return result;
  }

  activateButtons(): void {
    if (this.btnAdd) this.btnAdd.disabled = true;
    this.btnAdd?.addEventListener('click', (event: Event) => {
      if (event) event.preventDefault();
    });
  }
}
