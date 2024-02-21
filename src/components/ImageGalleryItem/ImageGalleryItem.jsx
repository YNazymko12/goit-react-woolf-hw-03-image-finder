export const ImageGalleryItem = ({ tags, webformatURL }) => {
  return (
    <li>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
