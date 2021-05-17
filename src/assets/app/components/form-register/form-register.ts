import { formTemplate } from './form-template';
import './_form-register.scss';
import { Component } from '../shared/component';
import { Validator } from './validator';
import { Indexdb } from '../indexdb/indexdb';
import { UserData } from '../../models/user-data';

export class FormRegister extends Component {
  private readonly btnAdd: HTMLButtonElement | null;

  private btnCancel: HTMLButtonElement | null;

  private inputs: NodeListOf<HTMLInputElement>;

  private validator: Validator;

  private db: Indexdb;

  private messageField: HTMLElement | undefined;

  constructor(db: Indexdb) {
    super('div', ['form-wrapper']);
    this.element.append(formTemplate());

    this.btnAdd = this.element.querySelector('.register__btn--add');
    this.btnCancel = this.element.querySelector('.register__btn--cancel');
    this.inputs = this.element.querySelectorAll('.register__input');
    this.validator = new Validator();
    this.db = db;

    this.hide();
  }

  start(): void {
    this.setupButtons();

    this.inputs.forEach(input => {
      const message = new Component('div', ['validation-message']);
      input.after(message.element);
      this.messageField = message.element;

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

  setupButtons(): void {
    if (this.btnAdd) this.btnAdd.disabled = true;

    this.btnAdd?.addEventListener('click', (event: Event) => {
      if (event) event.preventDefault();
      const user = this.getUser();
      this.db.add(user, this.informResult.bind(this));
    });

    this.btnCancel?.addEventListener('click', () => {
      this.hide();
    });
  }

  getUser(): UserData {
    return {
      firstName: this.inputs[0].value,
      lastName: this.inputs[1].value,
      email: this.inputs[2].value,
      score: 0,
    };
  }

  informResult(message: string): void {
    if (this.messageField) this.messageField.innerHTML = message;

    /* if no errors clear form fields and close the form */
    if (message.length === 0) this.btnCancel?.click();
  }
}
