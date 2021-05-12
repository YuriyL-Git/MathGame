import { getImagesList } from './helper-functions';

export default class Settings {
  public imageList: Promise<string[]>;

  constructor(imagesCategory: string, imagesQuantity: number) {
    this.imageList = getImagesList(imagesCategory, imagesQuantity);
  }
}
