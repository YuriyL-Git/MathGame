import { User } from '../models/user';

class Settings {
  public imagesCategory = 'abstract';

  public imagesQuantity = 12;

  public cardSize = '';

  public showTime = 1000;

  public user?: User;
}

export default new Settings();
