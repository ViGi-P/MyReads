import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Input
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
    this.setState({ query, error: '' }, async () => {
      try {
        const books = await search(query)
        if (books.error) throw books.error
        this.setState({ books })
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
      case 'Please provide a query in the request body': return 'Enter a word in the input above'
      default: return error
    }
  }

  render() {
    const { books } = this.state
    const { updateBook } = this.props

    return (
      <div>
        <Input.Search
          placeholder='Search by title or author'
          onSearch={this.onSearch}
        />
        <div className='search-results'>
          <span className='search-error'>
            {this.renderError()}
          </span>
          {books.map(book => <BookItem updateBook={updateBook} key={book.id} book={{ ...book, shelf: '' }}/>)}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  selectedKey: PropTypes.oneOf(['1', '2']).isRequired,
  updateBook: PropTypes.func.isRequired,
  changeKeys: PropTypes.func.isRequired
}
