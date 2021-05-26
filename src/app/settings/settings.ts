import { User } from '../models/user';

class Settings {
  public currentCategory = 'auto';

  public imagesQuantity = 20;

  public cardSize = '';

  public showTime = 15000;

  public cardBackImage = './card-covers/card-cover1.jpg';

  public user?: User;
}

export default new Settings();
