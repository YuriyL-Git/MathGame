import { Component } from '../../components/shared/component';
import { getImagesNames, getCoversNames } from '../../utils/helper-functions';

const CARDS_FIELD_SIZES = ['3x4', '4x4', '5x4', '6x5', '6x6'];

export const getCardFileSizeItems = (): Array<Component> => {
  const result: Array<Component> = [];
  CARDS_FIELD_SIZES.forEach(card_size => {
    const cardSizeItem = new Component('div', ['field-size-option__item']);
    cardSizeItem.element.innerHTML = card_size;

    /* get cards quantity value */
    const value = card_size.split('x').reduce((prev, curr) => +prev * +curr, 1);
    cardSizeItem.element.setAttribute('data-value', `${value}`);
    result.push(cardSizeItem);
  });

  return result;
};

export const getCardCategoryItems = async (): Promise<Array<Component>> => {
  const result: Array<Component> = [];
  const categories = await getImagesNames();
  categories.forEach(category => {
    const itemWrapper = new Component('div', ['image-category__item-wrapper']);

    const image = new Component('div', ['image-category__item']);
    image.element.setAttribute('data-value', category.categoryName);

    const imageTitle = new Component('div', ['image-category__title']);
    imageTitle.element.innerHTML = category.categoryName;

    const pathToImage = `./card-images/${category.categoryName}/${category.images[0]}`;
    image.element.style.backgroundImage = `url('${pathToImage}')`;

    itemWrapper.element.append(image.element, imageTitle.element);
    result.push(itemWrapper);
  });
  return result;
};

export const getCardCoversItems = async (): Promise<Array<Component>> => {
  const result: Array<Component> = [];
  const covers = await getCoversNames();
  covers.forEach(cover => {
    const coverItem = new Component('div', ['card-cover-option__item']);
    coverItem.element.setAttribute('data-value', cover);
    const pathToImage = `./card-covers/${cover}`;
    coverItem.element.style.backgroundImage = `url('${pathToImage}')`;

    result.push(coverItem);
  });
  return result;
};
