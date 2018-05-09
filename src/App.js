import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BooksCategory from './BooksCategory'
import SearchView from './SearchView'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {      
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
             this.setState({books})
        })
    }

    changeCategory = (book, shelf) => {
        if (this.state.books) {
            BooksAPI.update(book,shelf).then(() => {
                book.shelf = shelf;
                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book])
                }))
            })
        }
    }

    render() {
        
        const {books} = this.state        
        
        return (
            <div className="app" role="main">
                <div className="list-books">            
                    <div className="list-books-title">
                        <h1 tabIndex="0">My Reads</h1>
                    </div>
                    <div className="list-books-content">                   
                        <Route exact path="/" render={(history) => (
                            <div>
                                <BooksCategory
                                    categoryName = 'Read'
                                    books = {books.filter(book => book.shelf === "read")}
                                    onChangeCategory={this.changeCategory}
                                  />
                                <BooksCategory
                                    categoryName = 'Want to read'
                                    books = {books.filter(book => book.shelf === "wantToRead")}
                                    onChangeCategory={this.changeCategory} 
                                />
                                <BooksCategory
                                    categoryName = 'Currently Reading'
                                    books = {books.filter(book => book.shelf === "currentlyReading")}
                                    onChangeCategory={this.changeCategory}
                                />
                            </div>
                        )} /> 
                        
                        <Route path="/search" render={(history) => (
                            <div>
                                <SearchView
                                    books={books}
                                    onChangeCategory={this.changeCategory}
                                  />
                            </div>
                        )} />
                     </div>
                    <div className="open-search">
                        <Link to="/search" className="search">Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
