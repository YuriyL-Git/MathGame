import crypto from 'crypto-js';
import { Component } from '../shared/component';
import { formSignInTemplate } from './form-login-template';
import './_form-login.scss';
import { Indexdb } from '../../servises/indexdb';
import Settings from '../../settings/settings';

export class FormLogin extends Component {
  private db: Indexdb;

  private btnAdd: Element | null;

  private btnCancel: Element | null;

  private inputEmail: HTMLInputElement | null;

  private inputPassword: HTMLInputElement | null;

  private valMessage: Element | null;

  constructor(db: Indexdb) {
    super('div', ['login__wrapper']);
    this.element.append(formSignInTemplate());

    this.btnAdd = this.element.querySelector('.login__btn--add');
    this.btnCancel = this.element.querySelector('.login__btn--cancel');
    this.inputEmail = this.element.querySelector('.login__input-email');
    this.inputPassword = this.element.querySelector('.login__input-password');
    this.valMessage = this.element.querySelector('.login__validation-message');

    this.hide();
    this.db = db;

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnAdd?.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.validateLogin()
        .then(result => {
          if (result) {
            this.clearInputs();
            document.body.dispatchEvent(new CustomEvent('entersuccess'));
            this.hide();
          }
        })
        .catch(() => new Error());
    });

    this.btnCancel?.addEventListener('click', () => {
      this.clearInputs();
      window.history.back();
    });
  }

  async validateLogin(): Promise<boolean> {
    if (!this.inputEmail || !this.inputPassword || !this.valMessage)
      return false;

    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const validation = this.valMessage;
    validation.innerHTML = '';

    if (email.length === 0) {
      validation.innerHTML = 'Enter email';
      return false;
    }

    if (password.length === 0) {
      validation.innerHTML = 'Enter password';
      return false;
    }

    const user = await this.db.getUserByEmail(email);
    if (!user) {
      validation.innerHTML = 'Email is not found';
      return false;
    }

    if (String(crypto.SHA256(password)) !== user.passwordHash) {
      validation.innerHTML = 'Wrong password';
      return false;
    }
    Settings.user = user;
    return true;
  }

  private clearInputs(): void {
    if (!this.inputEmail || !this.inputPassword || !this.valMessage) return;
    this.inputEmail.value = '';
    this.inputPassword.value = '';
    this.valMessage.innerHTML = '';
  }
}
