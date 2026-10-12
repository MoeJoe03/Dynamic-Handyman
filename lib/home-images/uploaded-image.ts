export type UploadedImage = {
  key: string;
  imagePath: string;
  imageUrl: string;
  altText: string;
  source: 'Gallery' | 'Home page';
  galleryImageId: string | null;
};
