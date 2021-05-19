import { User } from './models/user';

class Settings {
  public imagesCategory = 'animals';

  public imagesQuantity = 20;

  public cardSize = '';

  public showTime = 3000;

  public user: User = {
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    score: 0,
  };
}

export default new Settings();
