const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {

    const [books, setBooks] = useState([])
    const [categoryStats, setCategoryStats] = useState([])
    const [priceStats, setPriceStats] = useState([])

    useEffect(() => {
        bookService.query().then(setBooks)
        bookService.getCategoryStats().then(setCategoryStats)
        bookService.getPriceStats().then(setPriceStats)
    }, [])

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} books</h2>

            <h4>By genre:</h4>
            <Chart data={categoryStats} type={'percentage'} />
            <hr />
            <h4>By price:</h4>
            <Chart data={priceStats} type={'number'} />
        </section>
    )
}