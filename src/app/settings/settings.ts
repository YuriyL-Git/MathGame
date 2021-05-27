import { User } from '../models/user';

class Settings {
  public currentCategory = 'animals';

  public imagesQuantity = 12;

  public cardSize = '';

  public showTime = 15000;

  public cardCoverImage = './card-covers/abstract-orange.jpg';

  public user?: User;

  public createNewGame = true;
}

export default new Settings();
