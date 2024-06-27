const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/books')
                showSuccessMsg('Book saved successfully!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem adding book')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setBookToEdit(prevBook => {
            if (field === 'listPrice') return {
                ...prevBook, listPrice: { ...prevBook.listPrice, amount: value }
            }
            return { ...prevBook, [field]: value }
        })
    }

    const { title, listPrice } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="listPrice">Price</label>
                <input onChange={handleChange} value={listPrice.amount} type="number" name="listPrice" id="listPrice" />

                <button>Save</button>
            </form>

        </section>
    )

}