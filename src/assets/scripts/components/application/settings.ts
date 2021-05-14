const DEFAULT_CATEGORY = 'animals';
const DEFAULT_IMAGE_QTY = 12;

class Settings {
  public imagesCategory: string;

  public imagesQuantity: number;

  public cardSize = '';

  constructor(
    imagesCategory = DEFAULT_CATEGORY,
    imagesQuantity = DEFAULT_IMAGE_QTY,
  ) {
    this.imagesCategory = imagesCategory;
    this.imagesQuantity = imagesQuantity;
  }
}

export default new Settings();
