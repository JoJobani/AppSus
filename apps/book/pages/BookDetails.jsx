const { useParams, Link } = ReactRouterDOM

import { AddReview } from "../cmps/AddReview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)

    const { bookId } = useParams()

    const currYear = new Date().getFullYear()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
        bookService.getNextBookId(bookId)
            .then(nextBookId => setNextBookId(nextBookId))
        bookService.getPrevBookId(bookId)
            .then(prevBookId => setPrevBookId(prevBookId))
    }, [bookId])

    function checkDifficulty() {
        if (book.pageCount > 500) return 'Serious reading!'
        else if (book.pageCount > 200) return 'Decent reading'
        else return 'Light Reading'
    }

    function checkAge() {
        if ((currYear - book.publishedDate) > 10) return 'Vintage'
        else return 'New'
    }

    function getPriceColor() {
        if (book.listPrice.amount > 150) return 'colored-red'
        if (book.listPrice.amount < 20) return 'colored-green'
        return ''
    }

    function onDeleteReview(reviewId) {
        bookService.deleteReview(book, reviewId)
            .then(book => setBook({ ...book }))
    }

    function onAddReview(review) {
        bookService.addReview(book, review)
            .then(book => setBook({ ...book }))
    }

    if (!book || !prevBookId || !nextBookId) return <div>Loading...</div>
    return (
        <div>
            <button><Link to="/books">
                <i className="fa-solid fa-arrow-left"></i>
                Return</Link></button>
            <section className="book-details">
                {book.listPrice.isOnSale
                    ? <h2 className="colored-red">ON SALE!!!!!!!!</h2>
                    : ''}
                <h1>Book title: {book.title}</h1>
                <section className="book-info">
                    <p>Subtitle: {book.subtitle}</p>
                    <p>Book Author: {book.authors}</p>
                    <p>Publish Date: {book.publishedDate} - {checkAge()}</p>
                    <p>Book Description: {book.description}</p>
                    <p>Page Count: {book.pageCount} - {checkDifficulty()}</p>
                    <h4>Book Categories: {book.categories}</h4>
                    <p>language: {book.language}</p>
                </section>
                <img src={book.thumbnail} />
                <h2 className={getPriceColor()}>Book Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h2>
                <section className="book-nav">
                    <button ><Link to={`/books/${prevBookId}`}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Previous Book</Link></button>
                    <button ><Link to={`/books/${nextBookId}`}>Next Book
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link></button>
                </section>
                <section className="reviews">
                    <h2>Reviews:</h2>
                    <AddReview onAddReview={onAddReview} />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Read At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book.reviews.map((review) => (
                                <tr key={review.reviewId}>
                                    <td>{review.fullName}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.readAt}</td>
                                    <td><button onClick={() => onDeleteReview(review.reviewId)}
                                        title="delete review">
                                        <i className="fa-solid fa-trash"></i>
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </div>
    )
}