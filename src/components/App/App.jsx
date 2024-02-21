import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from '../../services/api';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 0,
    query: '',
    images: [],
    error: null,
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

      if (this.state.page === 1) {
        return Notify.success(`${data.data.total} images found.`);
      }

      const totalPages = Math.floor(data.data.total / 12);

      this.setState(prev => ({
        images: prev.images ? [...prev.images, ...newImages] : newImages,

        totalPages: totalPages,
      }));
    } catch (error) {
      this.setState({ error: 'Sorry, an error occurred. Please try again.' });
      Notify.error(`${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && <ImageGallery images={images} />}
      </div>
    );
  }
}
