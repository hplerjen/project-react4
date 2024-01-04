const imageRootPath = '../assets/images/';

export function concatImagePath (image : string) : string  {
  const path = imageRootPath + image;
  return path;
}