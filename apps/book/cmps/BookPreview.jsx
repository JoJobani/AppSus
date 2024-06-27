export function BookPreview({ book }) {
    const title = book.title
    const price = book.listPrice.amount
    const genres = book.categories
    const thumbnail = book.thumbnail

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <img src={thumbnail} alt="" />
            <h4>Price: {price}</h4>
            <h4>Genres: {genres}</h4>
        </article>
    )
}