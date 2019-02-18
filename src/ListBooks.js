import React from 'react'
import PropTypes from 'prop-types'

import RatingBook from './RatingBook'
import SelectShelf from './SelectShelf'
import './App.css'

const ListBooks =({books, shelfs, bookshelftitle, changeShelf}) => {
  const showingBooks = books.filter((b) => b.shelf === shelfs)
 
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelftitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        
          {showingBooks.map((book) => (
            <li key = {book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" 
                    style={{width: 128, height: 193, 
                    backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}>
                  </div>   

                  <div className="book-shelf-changer">
                    <select id={book.id} 
                      onChange={() => {changeShelf({book}, 
                      SelectShelf(document.getElementById(book.id)))}}                       
                      defaultValue={book.shelf}
                    >
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading" >Currently Reading</option>
                      <option value="wantToRead" >Want to Read</option>
                      <option value="read" >Read</option>                                            
                      <option value="none" >None</option>
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

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  RatingBook: PropTypes.func,
  SelectShelf: PropTypes.func
};
export default ListBooks