import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images &&
        images.map(({ id, tags, webformatURL }) => (
          <ImageGalleryItem key={id} tags={tags} webformatURL={webformatURL} />
        ))}
    </List>
  );
};
