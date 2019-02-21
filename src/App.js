import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import * as BooksAPI from './BooksAPI'

import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  
  state = {
    books: [],
    isLoading: false
  }    
 
  async componentDidMount() {
    this.startLoading();
    const books = await BooksAPI.getAll()
    this.setState({books})
    this.endLoading();
  }

  updateBook = async (book, shelf) => {    
    await BooksAPI.update(book, shelf);
    this.endLoading();
  }  
  
  changeShelf = (book, selectShelf) => {
    this.startLoading();
    let {books} = this.state; 
    books=books.filter(b => b.id !== book.book.id).concat({
      ...book.book,      
      shelf: selectShelf
    }) 
    
    this.updateBook(book.book, selectShelf)     
    this.setState({books});
  } 
  
  startLoading = () => {
    this.setState({isLoading: true});
  }

  endLoading = () => {
    this.setState({isLoading: false});
  }

  render() {
    const {books = []} = this.state
    
    return (
      <div className="app">

        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text="Loading..."
        >
          <Route exact path="/search" render={() => (
            <SearchBooks  changeShelf={this.changeShelf} books={books}/>
          )}/>


          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Reads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div>
                    <ListBooks 
                      books={books} 
                      shelfs='currentlyReading' 
                      bookshelftitle='Currently Reading' 
                      changeShelf={this.changeShelf}
                    />        
                  </div>
                  <div>
                    <ListBooks  
                      books={books} 
                      shelfs='wantToRead' 
                      bookshelftitle='Want To Read'
                      changeShelf={this.changeShelf}                    
                    />        
                  </div>
                  <div>
                    <ListBooks  
                      books={books} 
                      shelfs='read' 
                      bookshelftitle='Read'        
                      changeShelf={this.changeShelf}                    
                    />
                  </div>
                </div>
              </div>

              <div className="open-search">
                <div className="open-search button">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            
            </div>
          )}/>
        </LoadingOverlay>      
      </div>      
    )
  }
}

export default BooksApp



