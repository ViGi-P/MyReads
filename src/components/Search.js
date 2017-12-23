import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Debounce
} from 'react-throttle'
import {
  Input, Icon
} from 'antd'
import {
  search
} from '../BooksApi'
import BookItem from './BookItem'

export default class Search extends Component {
  state = {
    query: '',
    books: [],
    error: ''
  }

  componentWillMount() {
    const { selectedKey, changeKeys } = this.props
    if (selectedKey !== '2') changeKeys('2')
  }

  onSearch = query => {
    this.setState({ query, error: <span><Icon type='loading'/> Loading...</span> }, async () => {
      try {
        const searchBooks = await search(query)
        if (searchBooks.error) throw searchBooks.error
        const books = searchBooks.map(book => {
          const myBook = this.props.myBooks.find(({ id }) => book.id === id)
          return myBook || { ...book, shelf: '' }
        })
        this.setState({ books, error: '' })
      } catch (error) {
        this.setState({ books: [], error })
        console.log('queryChange error', error)
      }
    })
  }

  renderError = () => {
    const { error, query } = this.state

    switch (error) {
      case 'empty query': return `No results found for "${query}"`
      case 'Please provide a query in the request body': return 'Type something in the input above'
      default: return error
    }
  }

  render() {
    const { books } = this.state
    const { updateBook } = this.props

    return (
      <div>
        <Debounce time='450' handler='onChange'>
          <Input.Search
            placeholder='Search by title or author'
            onChange={e => this.onSearch(e.target.value)}
          />
        </Debounce>
        <div className='search-results'>
          <span className='search-error'>
            {this.renderError()}
          </span>
          {books.map(book => <BookItem updateBook={updateBook} key={book.id} book={book}/>)}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  selectedKey: PropTypes.oneOf(['1', '2']).isRequired,
  myBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateBook: PropTypes.func.isRequired,
  changeKeys: PropTypes.func.isRequired
}
