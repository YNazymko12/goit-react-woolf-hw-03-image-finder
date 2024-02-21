import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showModal,
}) => {
  return (
    <Item>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => showModal(largeImageURL)}
      />
    </Item>
  );
};
