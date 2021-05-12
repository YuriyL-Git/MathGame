import { getImagesList } from './helper-functions';

class Settings {
  public imageList: Promise<string[]> | undefined;

  constructor(imagesCategory = 'unsorted', imagesQuantity = 8) {
    this.updateImageList(imagesCategory, imagesQuantity);
  }

  updateImageList(imagesCategory: string, imagesQuantity: number) {
    this.imageList = getImagesList(imagesCategory, imagesQuantity);
  }
}

export default new Settings();
