import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

const ListBooks =({books, shelfs, bookshelftitle, changeShelf}) => {
const showingBooks = books.filter((b) => b.shelf === shelfs)
//console.log('books', books)

const findStorage = ((bookId) => {
  let rating = localStorage.getItem(bookId)

  if (rating) {
    return rating
  } else {
    return "0"
  }
})


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
                      document.getElementById(book.id).value)}}                       
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
                      <select id={book.title}
                        onChange={() => {localStorage.setItem(book.id, 
                        document.getElementById(book.title).value)}}
                        defaultValue={findStorage(book.id)}
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

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  RatingBook: PropTypes.func,
  SelectShelf: PropTypes.func
};
export default ListBooks