import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from '../../services/api';

import { Container } from './App.styled';
import { LoadMoreButton } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 0,
    query: '',
    images: [],
    error: null,
    loading: false,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.addImages();
    }
  }

  onSubmit = data => {
    this.setState({ query: data, images: [], page: 1, totalPages: 0 });
  };

  onLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  addImages = async () => {
    try {
      this.setState({ loading: true });
      const data = await getImages(this.state.query, this.state.page);

      const newImages = data.data.hits;

      if (newImages.length === 0) {
        return Notify.warning(
          'Sorry, but no images were found for your request. Please try modifying your query and try again.'
        );
      }

      const totalPages = Math.floor(data.data.total / 12);

      this.setState(prev => ({
        images: prev.images ? [...prev.images, ...newImages] : newImages,
        totalPages: totalPages,
      }));

      if (this.state.page === 1) {
        return Notify.success(`${data.data.total} images found.`);
      }
    } catch (error) {
      this.setState({ error: 'Sorry, an error occurred. Please try again.' });
      Notify.error(`${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    const { images, page, totalPages, loading, largeImageURL, showModal } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} showModal={this.toggleModal} />
        )}

        {images.length > 0 && page <= totalPages && (
          <LoadMoreButton loadMore={this.onLoadMore}>
            Load More...
          </LoadMoreButton>
        )}

        {loading && <Loader />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </Container>
    );
  }
}
