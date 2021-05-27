export class FormValidator {
  public errorMessage = '';

  private value = '';

  isValid(input: HTMLInputElement): boolean {
    let result = true;
    this.value = input.value;
    if (input.dataset?.type === 'name') result = this.validateName();
    if (input.dataset?.type === 'email') result = this.validateEmail();
    return result;
  }

  private validateName(): boolean {
    let result = true;
    const specialChars = [...'(~!@#$%*()_—+=|:;"\'`< >,.?/^)'];
    if (this.value.length === 0) {
      this.errorMessage = `Field can't be blank`;
      return false;
    }

    specialChars.forEach(char => {
      if (this.value.indexOf(char) !== -1) {
        this.errorMessage = `Character ${char} is not allowed`;
        result = false;
      }
    });

    if (/^\d+$/.test(this.value)) {
      this.errorMessage = `Field can't contain only numbers`;
      result = false;
    }

    return result;
  }

  private validateEmail(): boolean {
    const specialChars = [...'"(),:;<>@[\\] ', '..'];
    let result = true;

    if (this.value.length === 0) {
      this.errorMessage = `Field can't be blank`;
      return false;
    }

    if ([...this.value].filter(el => el === '@').length === 0) {
      this.errorMessage = 'Email should contain @ symbol';
      return false;
    }

    const local = this.value.substr(0, this.value.indexOf('@'));
    const domain = this.value.substr(
      this.value.indexOf('@') + 1,
      this.value.length - 1,
    );

    if (domain.indexOf('@') !== -1) {
      this.errorMessage = 'Only one @ is allowed';
      return false;
    }

    if (local[0] !== '"' || local[local.length - 1] !== '"') {
      specialChars.forEach(char => {
        if (local.indexOf(char) !== -1) {
          this.errorMessage = `Character ${char} is not allowed outside quotation marks`;
          result = false;
        }
      });
    }
    if (!/^[0-9A-Za-z.-]+$/.test(domain)) {
      this.errorMessage = `Only numbers, letters, hyphens and periods are allowed in a domain name`;
      return false;
    }
    return result;
  }
}
