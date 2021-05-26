import './_settings-page.scss';
import Settings from '../../settings/settings';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';
import { settingsTemplate } from './settings-template';
import { Slider, SliderOptions } from '../../components/slider/slider';
import {
  getCardFileSizeOptions,
  getCardCategoryOptions,
} from './settings-options';

export class SettingsPage extends Component {
  private db: Indexdb;

  private sliderFieldSize: Slider;

  private page: Component;

  private sliderCategoryOptions: Slider | undefined;

  constructor(db: Indexdb) {
    super('div', ['settings__wrapper']);
    this.page = new Component('div', ['settings__page']);
    this.page.element.append(settingsTemplate());
    this.element.append(this.page.element);

    const fieldSizeOption = this.element.querySelector('.field-size-option');
    const categoryOption = this.element.querySelector('.category-option');

    const sliderOptions = this.getSliderOptions();
    this.sliderFieldSize = new Slider(
      'slider-field-size',
      sliderOptions,
      getCardFileSizeOptions(),
    );
    fieldSizeOption?.append(this.sliderFieldSize.element);

    console.log(window.innerHeight);
    sliderOptions.width = window.innerHeight / 2.5;
    sliderOptions.height = sliderOptions.width / 1.7;
    sliderOptions.buttonRatio = 0.2;
    getCardCategoryOptions()
      .then(result => {
        this.sliderCategoryOptions = new Slider(
          'slider-category',
          sliderOptions,
          result,
        );
        categoryOption?.append(this.sliderCategoryOptions.element);
      })
      .catch(() => new Error());

    this.db = db;
  }

  optionIsChanged(): void {
    console.log(this.sliderCategoryOptions?.activeItemValue);
  }

  getSliderOptions(): SliderOptions {
    return {
      width: 150,
      height: 70,
      buttonRatio: 0.25,
      callback: this.optionIsChanged.bind(this),
      animationSpeed: '0.15s',
      circlingAllowed: false,
    };
  }
}
