import arrowLeft from './arrow-images/arrow-left.png';
import arrowRight from './arrow-images/arrow-right.png';
import { Component } from '../shared/component';
import {
  getSliderStyles,
  getScreenStyles,
  getBtnStyles,
  getItemsStyles,
} from './styles-computed';

import './_slider.scss';

const BTN_RATIO_SIZE = 0.25;

interface Size {
  width: number;
  height: number;
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

  constructor(
    sliderName: string,
    sliderSize: Size,
    sliderItems: Array<Component>,
  ) {
    super('section', [sliderName]);
    this.stylesheet = document.createElement(`style`);

    this.screen = new Component('div', [`${sliderName}__screen`]);
    this.btnLeft = createBtn(sliderName, 'left', arrowLeft as string);
    this.btnRight = createBtn(sliderName, 'right', arrowRight as string);

    this.itemActiveClass = `${sliderName}__item-active`;
    this.itemFollowingClass = `${sliderName}__item-following`;

    this.items = sliderItems;
    this.items.forEach((item, index) => {
      item.element.classList.add(`${sliderName}__item`);
      if (index === 0) item.element.classList.add(`${sliderName}__item-active`);
      this.screen.element.append(item.element);
    });
    this.element.append(this.btnLeft, this.screen.element, this.btnRight);

    const btnWidth = Math.floor(sliderSize.width * BTN_RATIO_SIZE);
    this.styles =
      getBtnStyles(sliderName, btnWidth) +
      getSliderStyles(sliderName, sliderSize.width, sliderSize.height) +
      getScreenStyles(sliderName) +
      getItemsStyles(sliderName);

    this.stylesheet.innerHTML = this.styles;
    document.head.appendChild(this.stylesheet);

    this.animationInProcess = false;
    this.currentIndex = 0;

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnLeft.addEventListener('click', () => {
      if (!this.animationInProcess) {
        this.hideCurrent('to-left', this.currentIndex);
        this.currentIndex = this.getFollowingIndex(this.currentIndex + 1);
        this.showFollowing('from-right', this.currentIndex);
      }
    });

    this.btnRight.addEventListener('click', () => {
      if (!this.animationInProcess) {
        this.hideCurrent('to-right', this.currentIndex);
        this.currentIndex = this.getFollowingIndex(this.currentIndex - 1);
        this.showFollowing('from-left', this.currentIndex);
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
}
