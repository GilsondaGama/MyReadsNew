import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from "./BooksAPI"

import RatingBook from './RatingBook'
import SelectShelf from './SelectShelf'
import './App.css'

class SearchBooks extends Component { 

  state = {
    results: [],
    query: ''
  };

  constructor() {
    super()
    this.debounce = debounce(300, false, this.debounce)
  }

  updateQuery(event) {
    const query = event.target.value;
    this.setState({query});
    this.debounce(query);
  }
  
  clearQuery = () => {
    this.updateQuery('')
  }    
  
  debounce(query) {
    if (query === '' || query === undefined){
      this.setState({results: []});
      return;
    }

    BooksAPI.search(query).then((books) => {
      (books.constructor === Array)
      ? this.setState({results: books})
      : this.setState({results: []})
    });
  }  
  
  render() {
    const {changeShelf} = this.props

    let message;
    if (this.state.query === '') {
      message = "Write one or more keywords above to start searching."
    } else if (this.state.results.length === 0) {
      message = "No results found. Try different keywords."
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">              
            <input type="text" 
              placeholder="Search by title or author"
              value = {this.state.query}
              onChange = {(event) => this.updateQuery(event)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <h2 style={{ textAlign: 'center' }}>
            {message}
          </h2>

          <ol className="books-grid">
            {this.state.results.map((book) => (
              <li key = {book.id}>               
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" 
                      style={{width: 128, height: 193, 
                      backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}>
                    </div>   

                    <div className="book-shelf-changer">
                      <select id={book.id} 
                          onChange={() => {changeShelf({book}, 
                          SelectShelf(document.getElementById(book.id)))}}
                          defaultValue={book.shelf}
                      >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>                                            
                        <option value="none">None</option>
                      </select>
                    </div>
                    <div className="book-rating-star">
                      <div className="book-rating-number">
                        {RatingBook(book.title)}
                      </div>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}


export default SearchBooks