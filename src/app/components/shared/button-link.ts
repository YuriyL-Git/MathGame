export class ButtonLink {
  readonly element: HTMLAnchorElement;

  constructor(classes: string[], text: string, link: string) {
    this.element = document.createElement('a');
    this.element.classList.add(...classes);
    this.element.href = link;
    this.element.append(text);
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  show(): void {
    this.element.style.removeProperty('display');
  }
}
