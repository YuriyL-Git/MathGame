import { Component } from '../../components/shared/component';

export { getCardFileSizeOptions };

const CARDS_FIELD_SIZES = ['3x4', '4x4', '5x4', '6x5', '6x6'];

const getCardFileSizeOptions = () => {
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

const CARDS_IMAGE_TYPES = ['3x4', '4x4', '5x4', '6x5', '6x6'];
