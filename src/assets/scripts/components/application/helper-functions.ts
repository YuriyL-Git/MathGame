import { ImageCategoryModel } from '../../../../models/image-category-model';

async function getImagesList(
  category: string,
  quantity: number,
): Promise<string[]> {
  const res = await fetch('./images.json');
  const categories: ImageCategoryModel[] = (await res.json()) as ImageCategoryModel[];
  const currentCategory = categories.find(cat => cat.category === category);
  if (!currentCategory) throw new Error('Category is not found!');
  let images = currentCategory.images.map(
    name => `./images/${currentCategory.category}/${name}`,
  );
  if (images.length > quantity) images = images.slice(0, quantity);
  return images;
}

function delay(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export { getImagesList, delay };
