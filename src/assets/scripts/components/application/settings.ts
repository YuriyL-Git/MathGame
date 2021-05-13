import { getImagesList } from './helper-functions';

const DEFAULT_CATEGORY = 'unsorted';
const DEFAULT_IMAGE_QTY = 8;

class Settings {
  public imageList: Promise<string[]> | undefined;

  public imagesCategory: string;

  public imagesQuantity: number;

  constructor(
    imagesCategory = DEFAULT_CATEGORY,
    imagesQuantity = DEFAULT_IMAGE_QTY,
  ) {
    this.imagesCategory = imagesCategory;
    this.imagesQuantity = imagesQuantity;
    this.updateImageList();
  }

  updateImageList() {
    this.imageList = getImagesList(this.imagesCategory, this.imagesQuantity);
  }
}

export default new Settings();
