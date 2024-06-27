import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        loadBooks()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadBooks() {
        bookService.setFilterBy(filterBy)
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log('error', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
                showSuccessMsg('Book successfully removed!')
            })
            .catch(err => {
                console.log('problem removing book:', err)
                showErrorMsg('Problem removing book')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <button><Link to="/books/edit">Add Book</Link></button>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}