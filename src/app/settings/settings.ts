import { User } from '../models/user';

class Settings {
  public imagesCategory = 'animals';

  public imagesQuantity = 12;

  public cardSize = '';

  public showTime = 1000;

  public user?: User;
}

export default new Settings();
