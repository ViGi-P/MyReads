import React from 'react'
import PropTypes from 'prop-types'

const BookModal = ({ book, renderField }) => (
  <div>
    <h3>{renderField(book, 'title')}: {renderField(book, 'subtitle')}</h3>
    <h4>{renderField(book, 'authors').join(', ')}</h4>
    <h4>{renderField(book, 'publisher')}</h4>
    <h4>{renderField(book, 'publishedDate')}</h4>
    <p>{renderField(book, 'description').slice(0, 300)}{renderField(book, 'description').length > 300 && '...'}</p>
    <a target='_blank' rel='noopener noreferrer' href={book.previewLink}>Get this book</a>
  </div>
)

BookModal.propTypes = {
  book: PropTypes.object.isRequired,
  renderField: PropTypes.func.isRequired
}

export default BookModal
