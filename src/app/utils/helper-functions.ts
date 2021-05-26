import { ImageCategory } from '../models/image-category';

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function getImageData(): Promise<ImageCategory[]> {
  const res = await fetch('./card-images/images.json');
  return (await res.json()) as ImageCategory[];
}

async function getImagesList(
  category: string,
  quantity: number,
): Promise<string[]> {
  const categories = await getImageData();
  const currentCategory = categories.find(cat => cat.categoryName === category);
  if (!currentCategory) throw new Error('Category is not found!');
  let images = currentCategory.images.map(
    name => `./card-images/${currentCategory.categoryName}/${name}`,
  );
  shuffleArray(images);
  if (images.length > quantity / 2) images = images.slice(0, quantity / 2);

  const reversed = [...images].reverse();
  shuffleArray(reversed);
  images = images.concat(reversed);
  shuffleArray(images);
  return images;
}

function delay(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export { getImagesList, delay };
