import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterBy())
    const [noteToSave, setNoteToSave] = useState(noteService.getEmptyNote())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.setFilterBy(filterBy)
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => console.log(err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
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
            .then(() => {
                setNoteToSave(noteService.getEmptyNote())
                loadNotes()
                showSuccessMsg('Note successfully saved!')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
                showSuccessMsg('Note successfully removed!')
            })
            .catch(err => {
                console.log('problem removing note:', err)
                showErrorMsg('Problem removing note')
            })
    }

    function onUpdateNote(noteId, updatedNote) {
        noteService.save(updatedNote)
            .then(() => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? updatedNote : note
                    )
                )
                showSuccessMsg('Note successfully updated!')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem updating note')
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            <section className="filter-container">
                <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            </section>

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
                            <i className="fa-solid fa-a"></i>                        </button>
                        <button title="Upload image">
                            <i className="fa-solid fa-image"></i>
                        </button>
                        <button title="Upload video">
                            <i className="fa-brands fa-youtube"></i>
                        </button>
                        <button title="Create list">
                            <i className="fa-solid fa-list-ul"></i>
                        </button>
                    </div>

                </form>
            </section>

            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote}
            />
        </section>
    )
}