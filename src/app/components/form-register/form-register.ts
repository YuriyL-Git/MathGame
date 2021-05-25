import { formTemplate } from './form-template';
import './_form-register.scss';
import { Component } from '../shared/component';
import { Validator } from './validator';
import { Indexdb } from '../../servises/indexdb';
import { User } from '../../models/user';
import { ImageHandler } from './image-handler';
import Settings from '../../settings/settings';

const DB_ERROR_MESSAGE = 'Email is already present in the base!';

export class FormRegister extends Component {
  private readonly btnAdd: HTMLButtonElement | null;

  public btnCancel: HTMLButtonElement | null;

  private inputs: NodeListOf<HTMLInputElement>;

  private validator: Validator;

  private db: Indexdb;

  private messageField: HTMLElement | undefined;

  private readonly canvas: HTMLCanvasElement | null;

  private imageHandler: ImageHandler;

  constructor(db: Indexdb) {
    super('div', ['form-wrapper']);
    this.element.append(formTemplate());

    this.btnAdd = this.element.querySelector('.register__btn--add');
    this.btnCancel = this.element.querySelector('.register__btn--cancel');
    this.inputs = this.element.querySelectorAll('.register__input');
    this.canvas = this.element.querySelector('canvas');

    this.validator = new Validator();
    this.imageHandler = new ImageHandler(this.canvas);

    this.db = db;
    this.start();
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

      Settings.user = this.getUser();
      this.db
        .addRecord(Settings.user)
        .then(result => {
          if (!result) {
            if (this.messageField)
              this.messageField.innerHTML = DB_ERROR_MESSAGE;
          } else {
            this.clearInputs();
            this.element.dispatchEvent(new CustomEvent('userAdded'));
            this.hide();
            window.location.href = '/#game';
          }
        })
        .catch(error => new Error(error));
    });

    this.btnCancel?.addEventListener('click', () => {
      this.clearInputs();
      window.history.back();
    });
  }

  getUser(): User {
    return {
      avatar: this.imageHandler.getImage(),
      firstName: this.inputs[0].value,
      lastName: this.inputs[1].value,
      email: this.inputs[2].value,
      score: 0,
    };
  }

  clearInputs(): void {
    if (this.messageField) this.messageField.innerHTML = '';

    this.inputs.forEach(input => {
      input.innerText = '';
      input.style.backgroundColor = '#fff';
      if (input.nextElementSibling) input.nextElementSibling.innerHTML = '';
    });
  }
}
