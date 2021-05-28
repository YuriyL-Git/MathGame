import './_settings-page.scss';
import Settings from '../../settings/settings';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';
import { settingsTemplate } from './settings-template';
import { Slider, SliderOptions } from '../../components/slider/slider';
import {
  getCardFileSizeItems,
  getCardCategoryItems,
  getCardCoversItems,
} from './settings-options';
import { GameController } from '../../game-controller/game-controller';

const SHOW_TIME_OFFSET = 6;

const SLIDER_FIELD_SIZE_HEIGHT = 70;
const SLIDER_FIELD_SIZE_WIDTH = 150;
const SLIDER_FIELD_SIZE_BTN_RATIO = 0.25;

const SLIDER_CAT_HEIGHT_RATIO = 2.5;
const SLIDER_CAT_WIDTH_RATIO = 1.7;
const SLIDER_CAT_BTN_RATIO = 0.2;

export class SettingsPage extends Component {
  private db: Indexdb;

  private page: Component;

  private sliderCategoryOption: Slider | undefined;

  private sliderCardCoversOption: Slider | undefined;

  private sliderFieldSizeOption: Slider;

  private game: GameController;

  public settingsUpdated = true;

  constructor(game: GameController, db: Indexdb) {
    super('div', ['settings__wrapper']);
    this.page = new Component('div', ['settings__page']);
    this.page.element.append(settingsTemplate());
    this.element.append(this.page.element);

    const fieldSizeOption = this.element.querySelector('.field-size-option');
    const categoryOption = this.element.querySelector('.category-option');
    const cardCoverOption = this.element.querySelector('.card-cover-option');

    /* -- Field size option --------------------------------------------*/
    const sliderOptions = this.getSliderOptions();
    this.sliderFieldSizeOption = new Slider(
      'slider-field-size',
      sliderOptions,
      getCardFileSizeItems(),
    );
    fieldSizeOption?.append(this.sliderFieldSizeOption.element);

    /* -- Image categories option --------------------------------------*/
    sliderOptions.width = window.innerHeight / SLIDER_CAT_HEIGHT_RATIO;
    sliderOptions.height = sliderOptions.width / SLIDER_CAT_WIDTH_RATIO;
    sliderOptions.buttonRatio = SLIDER_CAT_BTN_RATIO;
    getCardCategoryItems()
      .then(items => {
        this.sliderCategoryOption = new Slider(
          'slider-category',
          sliderOptions,
          items,
        );
        categoryOption?.append(this.sliderCategoryOption.element);
      })
      .catch(err => new Error(err));

    /* -- Card covers option -------------------------------------------*/
    getCardCoversItems()
      .then(items => {
        this.sliderCardCoversOption = new Slider(
          'slider-card-cover',
          sliderOptions,
          items,
        );
        cardCoverOption?.append(this.sliderCardCoversOption.element);
        this.optionIsChanged();
      })
      .catch(err => new Error(err));

    this.game = game;
    this.db = db;
  }

  optionIsChanged(): void {
    Settings.cardsQty = +this.sliderFieldSizeOption.activeItemValue;
    if (this.sliderCategoryOption) {
      Settings.currentCategory = this.sliderCategoryOption.activeItemValue;
    }
    if (this.sliderCardCoversOption) {
      Settings.cardCoverImage = `./card-covers/${this.sliderCardCoversOption.activeItemValue}`;
    }
    Settings.showTime = (Settings.cardsQty - SHOW_TIME_OFFSET) * 1000;
    Settings.createNewGame = true;
  }

  getSliderOptions(): SliderOptions {
    return {
      width: SLIDER_FIELD_SIZE_WIDTH,
      height: SLIDER_FIELD_SIZE_HEIGHT,
      buttonRatio: SLIDER_FIELD_SIZE_BTN_RATIO,
      callback: this.optionIsChanged.bind(this),
      animationSpeed: '0.15s',
      circlingAllowed: false,
    };
  }
}
