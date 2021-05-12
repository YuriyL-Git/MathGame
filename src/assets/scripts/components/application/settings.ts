import { getImagesList } from './helper-functions';

const DEFAULT_CATEGORY = 'unsorted';
const DEFAULT_IMAGE_QTY = 4;

class Settings {
  public imageList: Promise<string[]> | undefined;

  constructor(
    imagesCategory = DEFAULT_CATEGORY,
    imagesQuantity = DEFAULT_IMAGE_QTY,
  ) {
    this.updateImageList(imagesCategory, imagesQuantity);
  }

  updateImageList(imagesCategory: string, imagesQuantity: number) {
    this.imageList = getImagesList(imagesCategory, imagesQuantity);
  }
}

export default new Settings();
