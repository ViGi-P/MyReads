const baseUrl = 'https://reactnd-books-api.udacity.com'

const headers = {
  'Accept': 'application/json',
  'Authorization': 'vignesh-awesome-token-man'
}

export const get = async (bookId) => {
  try {
    const data = await (await fetch(`${baseUrl}/books/${bookId}`, { headers })).json()
    return data.book
  } catch (e) {
    console.log('get error', e)
  }
}

export const getAll = async () => {
  try {
    const data = await (await fetch(`${baseUrl}/books`, { headers })).json()
    return data.books
  } catch (error) {
    console.log('getAll error', error)
    return { error }
  }
}

export const update = async (book, shelf) => {
  try {
    const payload = {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shelf })
    }
    const result = await (await fetch(`${baseUrl}/books/${book.id}`, payload)).json()
    return result
  } catch (error) {
    console.log('update error', error)
    return { error }
  }
}

export const search = async (query) => {
  try {
    const payload = {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }
    const data = await (await fetch(`${baseUrl}/search`, payload)).json()
    if (data.error) throw data.error
    return data.books
  } catch (error) {
    console.log('search error', error)
    return { error }
  }
}
