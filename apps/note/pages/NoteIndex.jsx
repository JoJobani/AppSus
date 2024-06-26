import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterBy())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.setFilterBy(filterBy)
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => console.log(err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({
            ...prevFilter, ...filterBy
        }))
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            {/* filter goes here */}

            <section className="add-note">
                <form action="">
                    <input
                        type="text"
                        name="add-note"
                        id="add-note"
                        placeholder="Take a note..."
                    />
                    <button title="Create written note">
                        <i className="fa-solid fa-note-sticky"></i>
                    </button>
                    <button type="submit" title="Create list">
                        <i class="fa-solid fa-list-ul"></i>
                    </button>
                    <button type="button" title="Upload image">
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button type="button" title="Upload video">
                        <i class="fa-brands fa-youtube"></i>
                    </button>
                </form>
            </section>

            <NoteList notes={notes} />
        </section>
    )
}