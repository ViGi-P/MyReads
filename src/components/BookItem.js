import React from 'react'
import PropTypes from 'prop-types'
import {
  Select, Card, Modal, Button
} from 'antd'
import BookModal from './BookModal'

const { Meta } = Card
const { Option } = Select

const renderField = (book, field) => {
  if (book[field]) return book[field]
  return []
}

const renderImageLink = book => {
  if (book.imageLinks && book.imageLinks.thumbnail) return book.imageLinks.thumbnail
  return 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
}

const BookItem = ({ book, updateBook }) => (
  <Card
    className='book-item'
    cover={<img className='book-item-cover' src={renderImageLink(book)} alt={book.title}/>}
    actions = {[
      <Button
        onClick={() => {
          Modal.info({
            content: <BookModal renderField={renderField} book={book}/>,
            okText: 'Close'
          })
        }}
      >
        More Info
      </Button>,
      <Select
        placeholder='Add to list'
        value={book.shelf}
        onChange={value => {
          updateBook(book, value)
        }}
        className='book-dropdown'
      >
        <Option value='currentlyReading'>Currently Reading</Option>
        <Option value='wantToRead'>Want To Read</Option>
        <Option value='read'>Read</Option>
        <Option style={{ display: book.shelf === '' ? 'none' : 'block' }} value='none'>Remove</Option>
        <Option style={{ display: 'none' }} value=''>Add to list</Option>
      </Select>
    ]}
  >
    <Meta
      avatar={<img className='book-item-img' src={renderImageLink(book)} alt={book.title}/>}
      description={<div className='book-description'>
        <h3>{renderField(book, 'title')}</h3>
        <p>{renderField(book, 'authors').join(', ')}</p>
        <p>{renderField(book, 'publishedDate')}</p>
      </div>}
    />
  </Card>
)

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
}

export default BookItem
