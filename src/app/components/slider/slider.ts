import arrowLeft from './arrow-icons/arrow-left.png';
import arrowRight from './arrow-icons/arrow-right.png';
import { Component } from '../shared/component';
import {
  getSliderStyles,
  getScreenStyles,
  getBtnStyles,
  getItemsStyles,
} from './styles-computed';
import './_slider.scss';

export interface SliderOptions {
  width: number;
  height: number;
  buttonRatio: number;
  callback: () => void;
  /* expected value format '0.2s' */
  animationSpeed: string;
  circlingAllowed: boolean;
}

function createBtn(
  sliderName: string,
  modificator: string,
  src: string,
): HTMLInputElement {
  const btn = document.createElement('input');
  btn.type = 'image';
  btn.src = src;
  btn.classList.add(`${sliderName}__btn`, `${sliderName}__btn--${modificator}`);
  return btn;
}

export class Slider extends Component {
  private btnLeft: HTMLInputElement;

  private btnRight: HTMLInputElement;

  private screen: Component;

  private stylesheet: HTMLElement;

  private styles: string;

  private items: Array<Component>;

  private animationInProcess: boolean;

  private currentIndex: number;

  private itemActiveClass: string;

  private itemFollowingClass: string;

  private options: SliderOptions;

  public activeItemValue = '';

  constructor(
    sliderName: string,
    sliderOptions: SliderOptions,
    sliderItems: Array<Component>,
  ) {
    super('section', [sliderName]);
    this.stylesheet = document.createElement(`style`);
    this.options = sliderOptions;

    /* -- create slider components -- */
    this.screen = new Component('div', [`${sliderName}__screen`]);
    this.btnLeft = createBtn(sliderName, 'left', arrowLeft as string);
    this.btnRight = createBtn(sliderName, 'right', arrowRight as string);

    /* -- create slider items classes -- */
    this.itemActiveClass = `${sliderName}__item-active`;
    this.itemFollowingClass = `${sliderName}__item-following`;

    /* to restore correct order of elements in slider */
    this.items = sliderItems.reverse();
    const lastItem = this.items.pop();
    if (lastItem) this.items.unshift(lastItem);

    /* -- apply classes to items and insert items inside screen component -- */
    this.items.forEach((item, index) => {
      item.element.classList.add(`${sliderName}__item`);
      if (index === 0) item.element.classList.add(`${sliderName}__item-active`);
      this.screen.element.append(item.element);
    });

    /* -- add all components to the slider -- */
    this.element.append(this.btnLeft, this.screen.element, this.btnRight);

    const btnWidth = Math.floor(sliderOptions.width * this.options.buttonRatio);

    /* -- compute slider styles -- */
    this.styles =
      getBtnStyles(sliderName, btnWidth) +
      getSliderStyles(sliderName, sliderOptions.width, sliderOptions.height) +
      getScreenStyles(sliderName) +
      getItemsStyles(sliderName);

    /* -- append styles to the page -- */
    this.stylesheet.innerHTML = this.styles;
    document.head.appendChild(this.stylesheet);

    /* -- set slider animation speed -- */
    document.documentElement.style.setProperty(
      '--animation-speed',
      this.options.animationSpeed,
    );

    /* setup starting values */
    this.animationInProcess = false;
    this.currentIndex = 0;
    this.setupButtons();
    this.updateItemActiveValue();
  }

  setupButtons(): void {
    if (!this.options.circlingAllowed) this.controlFlow();

    this.btnLeft.addEventListener('click', () => {
      if (!this.animationInProcess) {
        this.hideCurrent('to-left', this.currentIndex);
        this.currentIndex = this.getFollowingIndex(this.currentIndex + 1);
        this.showFollowing('from-right', this.currentIndex);
        if (!this.options.circlingAllowed) this.controlFlow();

        this.options.callback();
      }
    });

    this.btnRight.addEventListener('click', () => {
      if (!this.animationInProcess) {
        this.hideCurrent('to-right', this.currentIndex);
        this.currentIndex = this.getFollowingIndex(this.currentIndex - 1);
        this.showFollowing('from-left', this.currentIndex);
        if (!this.options.circlingAllowed) this.controlFlow();

        this.options.callback();
      }
    });
  }

  getFollowingIndex(index: number): number {
    return (this.items.length + index) % this.items.length;
  }

  hideCurrent(direction: string, index: number): void {
    this.animationInProcess = true;
    this.items[index].element.classList.add(direction);
    this.items[index].element.addEventListener('animationend', () => {
      this.items[index].element.classList.remove(
        this.itemActiveClass,
        direction,
      );
      this.animationInProcess = false;
    });
  }

  showFollowing(direction: string, index: number): void {
    this.items[index].element.classList.add(this.itemFollowingClass, direction);
    this.items[index].element.addEventListener('animationend', () => {
      this.items[index].element.classList.remove(
        this.itemFollowingClass,
        direction,
      );
      this.items[index].element.classList.add(this.itemActiveClass);
    });
  }

  updateItemActiveValue(): void {
    const activeValue = this.items[this.currentIndex].element.getAttribute(
      'data-value',
    );
    if (activeValue) this.activeItemValue = activeValue;
  }

  controlFlow(): void {
    this.btnLeft.disabled = false;
    this.btnRight.disabled = false;
    this.btnLeft.style.pointerEvents = 'auto';
    this.btnRight.style.pointerEvents = 'auto';
    this.updateItemActiveValue();

    if (
      this.getFollowingIndex(this.currentIndex - 1) ===
      this.items.length - 1
    ) {
      this.btnLeft.disabled = true;
      this.btnLeft.style.pointerEvents = 'none';
    }

    if (this.getFollowingIndex(this.currentIndex - 1) === 0) {
      this.btnRight.disabled = true;
      this.btnRight.style.pointerEvents = 'none';
    }
  }
}
