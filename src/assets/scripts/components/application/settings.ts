const DEFAULT_CATEGORY = 'animals';
const DEFAULT_IMAGE_QTY = 12;

class Settings {
  public imageList: Promise<string[]> | undefined;

  public imagesCategory: string;

  public imagesQuantity: number;

  public cardSize = '20px';

  constructor(
    imagesCategory = DEFAULT_CATEGORY,
    imagesQuantity = DEFAULT_IMAGE_QTY,
  ) {
    this.imagesCategory = imagesCategory;
    this.imagesQuantity = imagesQuantity;
  }
}

export default new Settings();
