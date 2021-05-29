import { User } from '../models/user';

class Settings {
  public currentCategory = 'animals';

  public cardsQty = 12;

  /* card Size in px */
  public cardSize = 0;

  public showTime = 0;

  public cardCoverImage = './card-covers/abstract-orange.jpg';

  public user: User | null = null;

  public createNewGame = true;
}

export default new Settings();
