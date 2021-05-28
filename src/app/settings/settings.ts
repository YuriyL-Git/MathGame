import { User } from '../models/user';

class Settings {
  public currentCategory = 'animals';

  public imagesQuantity = 12;

  /* card Size in px */
  public cardSize = 0;

  public showTime = 15000;

  public cardCoverImage = './card-covers/abstract-orange.jpg';

  public user?: User;

  public createNewGame = true;
}

export default new Settings();
