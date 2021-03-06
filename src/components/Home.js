import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

export default class Home extends Component {
  componentWillMount() {
    const { selectedKey, changeKeys } = this.props
    if (selectedKey !== '1') changeKeys('1')
  }

  render() {
    const { books, updateBook } = this.props

    return (
      <div>
        <h2>Currently Reading</h2>
        <div>
          {books.filter(book => book.shelf === 'currentlyReading').map(book => <BookItem updateBook={updateBook} key={book.id} book={book}/>)}
        </div>
        <h2>Want To Read</h2>
        <div>
          {books.filter(book => book.shelf === 'wantToRead').map(book => <BookItem updateBook={updateBook} key={book.id} book={book}/>)}
        </div>
        <h2>Read</h2>
        <div>
          {books.filter(book => book.shelf === 'read').map(book => <BookItem updateBook={updateBook} key={book.id} book={book}/>)}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  selectedKey: PropTypes.oneOf(['1', '2']).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  getBooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  changeKeys: PropTypes.func.isRequired
}
