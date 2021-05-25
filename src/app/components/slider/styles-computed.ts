export { getSliderStyles, getBtnStyles, getScreenStyles, getItemsStyles };

const getSliderStyles = (
  sliderName: string,
  width: number,
  height: number,
): string => {
  return `
  .${sliderName}{
    width: ${width}px;
    height: ${height}px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  `;
};

const getScreenStyles = (sliderName: string): string => {
  return `
  .${sliderName}__screen{
    width: 80%;
    height: 100%;
    background-color: blue;
    overflow: hidden;
    position: relative;
    display: flex;
  }`;
};

const getItemsStyles = (sliderName: string): string => {
  return `
  .${sliderName}__item{
    width: 100%;
    height: 100%;
    position: relative;
    display: none;
  }
  .${sliderName}__item-active{
    display: flex;
  }
  .${sliderName}__item-following{
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }
  `;
};

const getBtnStyles = (sliderName: string, width: number): string => {
  return `
  .${sliderName}__btn{
    background-color: orange;
    width: ${width}px;
    height: auto;
  }
  .${sliderName}__btn:hover{
    transform: scale(1.2);
  }
  `;
};
