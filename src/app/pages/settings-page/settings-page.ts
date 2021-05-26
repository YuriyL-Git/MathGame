import './_settings-page.scss';
import Settings from '../../settings/settings';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';
import { settingsTemplate } from './settings-template';
import { Slider, SliderOptions } from '../../components/slider/slider';
import { getCardFileSizeOptions } from './settings-options';

export class SettingsPage extends Component {
  private db: Indexdb;

  private sliderFieldSize: Slider;

  private page: Component;

  constructor(db: Indexdb) {
    super('div', ['settings__wrapper']);
    this.page = new Component('div', ['settings__page']);
    this.page.element.append(settingsTemplate());
    this.element.append(this.page.element);

    const sliderOptions = this.getSliderOptions();
    this.sliderFieldSize = new Slider(
      'slider-card-size',
      sliderOptions,
      getCardFileSizeOptions(),
    );

    const fieldSizeOption = this.element.querySelector(
      '.settings__field-size-option',
    );
    fieldSizeOption?.append(this.sliderFieldSize.element);
    this.db = db;
  }

  optionIsChanged(): void {
    console.log(this.sliderFieldSize.activeItemValue);
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
