import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterBy())
    const [noteToSave, setNoteToSave] = useState(noteService.getEmptyNote())

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

    function handleInput({ target }) {
        setNoteToSave(prevNote => {
            return { ...prevNote, info: { ...prevNote.info, txt: target.value } }
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        setNoteToSave(prevNote => {
            return { ...prevNote, createdAt: Date.now() }
        })
        noteService.save(noteToSave)
        setNoteToSave(noteService.getEmptyNote())
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            {/* filter goes here */}

            <section className="add-note">
                <form onSubmit={onSaveNote}>
                    <input
                        type="text"
                        name="add-note"
                        id="add-note"
                        placeholder="Take a note..."
                        onChange={handleInput}
                        value={noteToSave.info.txt}
                    />

                    <div className="button-container">
                        <button title="Create written note">
                            <i className="fa-solid fa-note-sticky"></i>
                        </button>
                        <button title="Create list">
                            <i className="fa-solid fa-list-ul"></i>
                        </button>
                        <button title="Upload image">
                            <i className="fa-solid fa-image"></i>
                        </button>
                        <button title="Upload video">
                            <i className="fa-brands fa-youtube"></i>
                        </button>
                    </div>

                </form>
            </section>

            <NoteList notes={notes} />
        </section>
    )
}