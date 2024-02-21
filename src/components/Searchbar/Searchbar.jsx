import { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Form, Header, Input, SearchBtn, Span } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.state.searchQuery.trim() === ''
      ? Report.failure(
          'Sorry',
          'Sorry, but I dont know what to search for. Please enter your query in the search field, and Ill see what I can find.',
          'Ok'
        )
      : this.props.onSubmit(this.state.searchQuery) || this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="searchInput">
            <SearchBtn type="submit">
              <Span>Search</Span>
            </SearchBtn>
          </label>

          <Input
            id="searchInput"
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
