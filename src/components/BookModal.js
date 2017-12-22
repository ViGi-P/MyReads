import React from 'react'

export default ({ book, renderField }) => (
  <div>
    <h3>{renderField(book, 'title')}: {renderField(book, 'subtitle')}</h3>
    <h4>{renderField(book, 'authors').join(', ')}</h4>
    <h4>{renderField(book, 'publisher')}</h4>
    <h4>{renderField(book, 'publishedDate')}</h4>
    <p>{renderField(book, 'description')}</p>
    <a target='_blank' rel='noopener noreferrer' href={book.previewLink}>Get this book</a>
  </div>
)
