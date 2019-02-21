import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from "./BooksAPI"

import SingleBook from './SingleBook'
import './App.css'

class SearchBooks extends Component { 

  state = {
    query: '',
    books: []
  }

  constructor() {
    super()
    this.debounce = debounce(300, true, this.searchBooks)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.books.length > 0 && nextProps.books.length > 0) {
      this.setBookShelves(this.state.books, nextProps.books);
    }
  }

  updateQuery = query => {
    this.setState({ query });
    this.searchBooks(query);
  };

  searchBooks = query => {
    if (query === '') {
      this.setState({ books: [] });
    } else {
      BooksAPI.search(query, 20).then(books => {
        if (Array.isArray(books)) {
          this.setBookShelves(books, this.props.books);
        }
      });
    }
  };

  setBookShelves = (searchBooks, myBooks) => {
    const correctlyShelvedBooks = searchBooks.map(searchBook => {
      const myBook = myBooks.filter(
        propBook => propBook.id === searchBook.id
      )[0];
      if (myBook) {
        searchBook.shelf = myBook.shelf;
      } else {
        searchBook.shelf = 'none';
      }
      return searchBook;
    });

    if (this.state.books !== correctlyShelvedBooks) {
      this.setState({ books: correctlyShelvedBooks });
    }
  };

  render() {

    let message;
    if (this.state.query === '') {
      message = "Write one or more keywords above to start searching."
    } else if (this.state.books.length === 0) {
      message = "No results found. Try different keywords."
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        
        <div className="search-books-results">
          <h2 style={{ textAlign: 'center' }}>
            {message}
          </h2>

          <ol className="books-grid">
              {this.state.books.map((book) => (
                <li key = {book.id}>
                  {SingleBook(book, this.props.changeShelf)}
                </li>             
              ))}
            </ol>
        </div>

      </div>
    );
  }
}


export default SearchBooks