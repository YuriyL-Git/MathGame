export class Button {
  readonly element: HTMLButtonElement;

  constructor(classes: string[], text: string) {
    this.element = document.createElement('button');
    this.element.classList.add(...classes);
    this.element.append(text);
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  show(): void {
    this.element.style.removeProperty('display');
  }
}
