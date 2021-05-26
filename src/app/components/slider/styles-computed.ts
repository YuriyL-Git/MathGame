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
    width: ${width}px;
    height: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
  }
  .${sliderName}__btn:hover{
    transform: scale(1.05);
    filter: hue-rotate(25deg);
  }
  .${sliderName}__btn:active{
    transform: scale(0.95);
  }
  `;
};
