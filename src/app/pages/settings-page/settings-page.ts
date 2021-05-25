import './_settings-page.scss';
import Settings from '../../settings/settings';
import { Component } from '../../components/shared/component';
import { Indexdb } from '../../servises/indexdb';

export class SettingsPage extends Component {
  private db: Indexdb;

  private page: Component;

  constructor(db: Indexdb) {
    super('div', ['settings__wrapper']);
    this.page = new Component('div', ['settings__page']);
    const title = new Component('div', ['settings__title']);
    title.element.innerText = 'Settings';

    this.page.element.append(title.element);

    this.element.append(this.page.element);
    this.db = db;
  }
}
