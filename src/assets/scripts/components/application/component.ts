export class Component {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    classes: string[] = [],
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classes);
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  show(): void {
    this.element.style.removeProperty('display');
  }
}
