import type { Crop } from 'react-image-crop';

export async function getCroppedImage(imageWidth: number, imageHeight: number, image: HTMLImageElement, crop: Crop) {
  if (!crop.x || !crop.y || !crop.width || !crop.height) return;

  const canvas =  document.createElement("canvas");
  canvas.width =  imageWidth;
  canvas.height = imageHeight;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx =    canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, imageWidth, imageHeight);

  const preview: string = await new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) return;
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg', 1);
  });

  const final: File = await new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) return;
      const image = new File([blob], "final", {type: "image/jpeg"});
      resolve(image);
    }, 'image/jpeg', 1);
  });

  return {preview, final};
}