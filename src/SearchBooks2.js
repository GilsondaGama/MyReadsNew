import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from "./BooksAPI"

import SingleBook from './SingleBook'
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
      if (books.constructor === Array) {
        this.setState({ results: books });
      } else {
        this.setState({ results: [] });
      }
      console.log('BOOKS:', books.constructor )
      console.log('RESULTS:', this.state.results)
    });
  }  

  

 
  render() {

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
                <SingleBook 
                  book={book} 
                  books={this.props.books} 
                  changeShelf={this.props.changeShelf}/>
              </li>             
            ))}
          </ol>
        </div> 
      </div>
    )
  }
}


export default SearchBooks