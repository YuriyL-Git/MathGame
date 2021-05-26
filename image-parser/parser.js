const fs = require("fs");
const path = require("path");

const result = [];
const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

const pathToParse = path.join(__dirname, '../src/public/card-images');
console.log(pathToParse);
const directories = getDirectories(pathToParse);

directories.forEach(dir => {
  const path = pathToParse + '/' + dir;
  const files = fs.readdirSync(path);
  const categoryItem = {};
  categoryItem.categoryName = dir;
  categoryItem.images = files;
  result.push(categoryItem);
});

const jsonResult = JSON.stringify(result);

fs.writeFile(pathToParse + '/images.json', jsonResult, 'utf8', callback);

function callback() {
  console.log('JSON file updated');
}

