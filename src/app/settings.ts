import { User } from './models/user';

class Settings {
  public imagesCategory = 'animals';

  public imagesQuantity = 20;

  public cardSize = '';

  public showTime = 3000;

  public user?: User;
}

export default new Settings();
