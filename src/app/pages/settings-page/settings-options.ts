import { Component } from '../../components/shared/component';
import { getImageData } from '../../utils/helper-functions';

export { getCardFileSizeOptions };

const CARDS_FIELD_SIZES = ['3x4', '4x4', '5x4', '6x5', '6x6'];

const getCardFileSizeOptions = (): Array<Component> => {
  const result: Array<Component> = [];
  CARDS_FIELD_SIZES.forEach(card_size => {
    const cardSizeItem = new Component('div', ['card-size__item']);
    cardSizeItem.element.innerHTML = card_size;

    /* get cards quantity value */
    const value = card_size.split('x').reduce((prev, curr) => +prev * +curr, 1);
    cardSizeItem.element.setAttribute('data-value', `${value}`);
    result.push(cardSizeItem);
  });

  return result;
};

export const getCardCategoryOptions = async (): Promise<Array<Component>> => {
  const result: Array<Component> = [];
  const categories = await getImageData();
  categories.forEach(category => {
    const imageItem = new Component('div', ['image-category-item']);
    const imageTitle = new Component('div', ['image-category-title']);
    imageTitle.element.innerHTML = category.categoryName;

    const pathToImage = `./card-images/${category.categoryName}/${category.images[0]}`;
    imageItem.element.style.backgroundImage = `url('${pathToImage}')`;
    imageItem.element.append(imageTitle.element);
    result.push(imageItem);
  });
  return result;
};
