const fs = require("fs");
const path = require("path");

const cardImagesPath = path.join(__dirname, '../src/public/card-images');
const cardCoversPath = path.join(__dirname, '../src/public/card-covers');

const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
const cardImagesDirectories = getDirectories(cardImagesPath);

const cardImagesResult = [];
cardImagesDirectories.forEach(dir => {
  const path = cardImagesPath + '/' + dir;
  const files = fs.readdirSync(path);
  const categoryItem = {};
  categoryItem.categoryName = dir;
  categoryItem.images = files;
  cardImagesResult.push(categoryItem);
});
const jsonCardImages = JSON.stringify(cardImagesResult);
fs.writeFile(cardImagesPath + '/images.json', jsonCardImages, 'utf8', cardImageMessage);

let cardCoversResult = fs.readdirSync(cardCoversPath);
cardCoversResult = cardCoversResult.filter(element => !element.includes('.json'));

const jsonCardCovers = JSON.stringify(cardCoversResult);
fs.writeFile(cardCoversPath + '/covers.json', jsonCardCovers, 'utf8', cardCoverMessage);

console.log(cardCoversResult);

function cardImageMessage() {
  console.log('Card image JSON file updated');
}

function cardCoverMessage() {
  console.log('Card cover JSON file updated');
}

