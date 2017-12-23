import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom'
import {
  Layout, Menu, Icon, Dropdown, Spin, message
} from 'antd'
import Search from './components/Search'
import Home from './components/Home'
import NotFound from './components/NotFound'
import {
  getAll, update
} from './BooksApi'
import './App.css'

const { Header, Content, Footer } = Layout

const menuItems = [
  <Menu.Item key='1'>
    <Link to='/' className='footer'>My Books <Icon type='book'/></Link>
  </Menu.Item>,
  <Menu.Item key='2'>
    <Link to='/search' className='footer'>Search <Icon type='search'/></Link>
  </Menu.Item>
]

const renderListTypes = type => {
  switch (type) {
    case 'currentlyReading': return 'Currently Reading'
    case 'wantToRead': return 'Want To Read'
    case 'read': return 'Read'
    default: return ''
  }
}

class App extends Component {
  state = {
    selectedKey: '1',
    books: [],
    loading: true
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    try {
      const books = await getAll()
      if (books.error) throw books.error
      this.setState({ books })
    } catch (error) {
      this.setState({ books: [] })
      console.log('getBooks error', error)
    } finally {
      this.setState({ loading: false })
    }
  }

  updateBook = (book, shelf) => {
    this.setState({ loading: true }, async () => {
      try {
        const response = await update(book, shelf)
        if (response.error) throw response.error
        const oldBooks = this.state.books
        const books = [ ...oldBooks.filter(({ id }) => id !== book.id), { ...book, shelf } ]
        this.setState({ books }, () => {
          if (shelf === 'none') message.success(`${book.title} has been removed`)
          else message.success(`${book.title} has been added to ${renderListTypes(shelf)} list`)
        })
      } catch (error) {
        console.log('updateBook error', error)
      } finally {
        this.setState({ loading: false })
      }
    })
  }

  changeKeys = selectedKey => this.setState({ selectedKey })

  render() {
    const { selectedKey, books, loading } = this.state
    const menu = mode => <Menu
      theme='dark'
      mode={mode}
      selectedKeys={[selectedKey]}
      className='nav-items'
    >
      {menuItems}
    </Menu>

    return (
      <Router>
        <Spin spinning={loading} tip='Please wait...'>
          <Layout className='layout'>
            <Header>
              <span className='logo'>
                MyReads
              </span>
              {menu('horizontal')}
              <Dropdown
                placement='bottomRight'
                trigger={['click']}
                overlay={menu('vertical')}
              >
                <span className='logo nav-items-sm'>
                  <Icon type='pause'/><Icon style={{ transform: 'rotate(90deg)', marginLeft: -7 }} type='minus'/>
                </span>
              </Dropdown>
            </Header>
            <Content className='content'>
              <Switch>
                <Route exact path='/' component={() => <Home selectedKey={selectedKey} books={books} getBooks={this.getBooks} updateBook={this.updateBook} changeKeys={this.changeKeys}/>}/>
                <Route exact path='/search' component={() => <Search selectedKey={selectedKey} myBooks={books} updateBook={this.updateBook} changeKeys={this.changeKeys}/>}/>
                <Route component={NotFound}/>
              </Switch>
            </Content>
            <Footer className='footer'>
              MyReads ©2017 Created by <a target='_blank' rel='noopener noreferrer' href='https://github.com/ViGi-P'>ViGi-P</a>
            </Footer>
          </Layout>
        </Spin>
      </Router>
    )
  }
}

export default App
