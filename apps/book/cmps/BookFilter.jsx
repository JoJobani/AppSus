const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, maxPrice } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>filter books:</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input type="text" value={title} onChange={handleChange} name="title" id="title" />

                <label htmlFor="maxPrice">Max price: </label>
                <input type="range" min="1" max="500" value={maxPrice} onChange={handleChange} name="maxPrice" id="maxPrice" />
                <span>{maxPrice}</span>
            </form>
        </section>
    )

}