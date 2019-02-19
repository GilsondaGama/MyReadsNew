import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from "./BooksAPI"
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

  findStorage = (bookId) => {
    let rating = localStorage.getItem(bookId)
  
    if (rating) {
      return rating
    } else {
      return "0"
    }
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
                          document.getElementById(book.id).value)}}                        
                          defaultValue="move"
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
                        <select id={book.title}
                          onChange={() => {localStorage.setItem(book.id, 
                          document.getElementById(book.title).value)}}
                          defaultValue={this.findStorage(book.id)}
                        >
                          <option value="0" disabled>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>                                            
                          <option value="5">5</option>
                        </select>
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