import React from 'react'
import PropTypes from 'prop-types'

import SingleBook from './SingleBook'
import './App.css'

const ListBooks = ({books, shelfs, bookshelftitle, changeShelf}) => {
  const showingBooks = books.filter((b) => b.shelf === shelfs)

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelftitle}</h2>
      <div className="bookshelf-books">

        <ol className="books-grid">       
          {showingBooks.map((book) => (
            <li key = {book.id}>
              {SingleBook(book, changeShelf)}            
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
};
export default ListBooks