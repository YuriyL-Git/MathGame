import './_settings-page.scss';
import Settings from '../../settings/settings';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';
import { settingsTemplate } from './settings-template';
import { Slider } from '../../components/slider/slider';

export class SettingsPage extends Component {
  private db: Indexdb;

  private slider: Slider;

  private page: Component;

  constructor(db: Indexdb) {
    super('div', ['settings__wrapper']);
    this.page = new Component('section', ['settings__page']);

    const sliderSize = {
      width: 350,
      height: 200,
    };

    // this.slider = new Slider('slider-test', sliderSize, [item1, item2]);
    this.page.element.append(settingsTemplate() /* this.slider.element */);

    this.element.append(this.page.element);
    this.db = db;
  }
}
