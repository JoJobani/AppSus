import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { title: '', maxPrice: 500 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getPrevBookId,
    addReview,
    deleteReview,
    getFilterBy,
    setFilterBy,
    getFilterFromSearchParams,
    getCategoryStats,
    getPriceStats
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= gFilterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0, thumbnail = '', description = utilService.makeLorem(150), currencyCode = 'EUR', isOnSale = false) {
    return {
        id: '',
        title,
        thumbnail,
        description,
        listPrice: {
            amount: price,
            currencyCode,
            isOnSale
        },
        reviews: []
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let prevBookIdx = books.findIndex(book => book.id === bookId) - 1
            if (prevBookIdx < 0) prevBookIdx = books.length - 1
            return books[prevBookIdx].id
        })
}

function addReview(book, review) {
    review.reviewId = utilService.makeId()
    book.reviews.unshift(review)
    return save(book)
}

function deleteReview(book, reviewId) {
    let reviewIdx = book.reviews.findIndex(review => review.reviewId === reviewId)
    book.reviews.splice(reviewIdx, 1)
    return save(book)
}

function getFilterFromSearchParams(searchParams) {
    const title = searchParams.get('title') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    return { title, maxPrice }
}

function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBooksCountByCategoryMap(books)
            const data = Object.keys(bookCountByCategoryMap).map(category => ({
                title: category,
                value: Math.round((bookCountByCategoryMap[category] / books.length) * 100)
            }))
            return data
        })
}

function _getBooksCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        book.categories.forEach((category) => {
            if (!map[category]) map[category] = 0
            map[category]++
        })
        return map
    }, {})
    return bookCountByCategoryMap
}

function getPriceStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByPriceMap = _getBooksCountByPriceMap(books)
            const data = Object.keys(bookCountByPriceMap).map(priceName => ({
                title: priceName,
                value: bookCountByPriceMap[priceName]
            }))
            return data
        })
}

function _getBooksCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce((map, book) => {
        if (book.listPrice.amount < 20) map.cheap++
        else if (book.listPrice.amount > 150) map.expensive++
        else map.average++
        return map
    }, { cheap: 0, average: 0, expensive: 0 })
    return bookCountByPriceMap
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        for (let i = 0; i < 20; i++) {
            let book = _createBook(ctgs)
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(ctgs) {
    const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `../../../assets/img/bookCovers/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, gFilterBy.maxPrice),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        reviews: [
            {
                reviewId: utilService.makeId(),
                fullName: utilService.makeLorem(2),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: "2024-06-24"
            },
            {
                reviewId: utilService.makeId(),
                fullName: utilService.makeLorem(2),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: "2024-06-24"
            },
            {
                reviewId: utilService.makeId(),
                fullName: utilService.makeLorem(2),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: "2024-06-24"
            }
        ]
    }
    return book
}