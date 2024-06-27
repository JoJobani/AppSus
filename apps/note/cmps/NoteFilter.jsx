const { useEffect, useState } = React

export function NoteFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="note-filter">
            <form onSubmit={onSubmitFilter}>
                <input
                    type="text"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    name="txt"
                    id="txt"
                    placeholder="Search Notes..." />
            </form>
        </section>
    )
}