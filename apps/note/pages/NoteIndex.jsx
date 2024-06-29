import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterBy())
    const [noteToSave, setNoteToSave] = useState(noteService.getEmptyNote())
    const [currentNoteType, setCurrentNoteType] = useState('NoteTxt')

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
            if (currentNoteType === 'NoteTodo') {
                const todos = target.value.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
                return { ...prevNote, info: { ...prevNote.info, todos } }
            } else {
                const infoKey = currentNoteType === 'NoteTxt' ? 'txt' : 'url'
                return { ...prevNote, info: { ...prevNote.info, [infoKey]: target.value } }
            }
        })
    }

    function changeNoteType(type) {
        setCurrentNoteType(type)
        setNoteToSave(noteService.getEmptyNote(type))
    }

    function handleSubmit() {
        if (noteToSave.info.txt || noteToSave.info.url || (noteToSave.info.todos && noteToSave.info.todos.length > 0)) {
            setNoteToSave(prevNote => ({
                ...prevNote,
                type: currentNoteType,
                createdAt: Date.now()
            }))
            noteService.save(noteToSave)
                .then(() => {
                    setNoteToSave(noteService.getEmptyNote(currentNoteType))
                    loadNotes()
                    showSuccessMsg('Note successfully saved!')
                })
        }
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        handleSubmit()
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
                        placeholder={
                            currentNoteType === 'NoteTxt' ? "Take a note..." :
                                currentNoteType === 'NoteImg' ? "Enter image URL..." :
                                    currentNoteType === 'NoteVideo' ? "Enter video URL..." :
                                        "Enter comma seperated list..."
                        }
                        onChange={handleInput}
                        onBlur={handleSubmit}
                        value={
                            currentNoteType === 'NoteTodo'
                                ? (noteToSave.info.todos ? noteToSave.info.todos.map(todo => todo.txt).join(', ') : '')
                                : (noteToSave.info.txt || noteToSave.info.url || '')
                        }
                    />

                    <div className="button-container">
                        <button type="button" title="Create written note" onClick={() => changeNoteType('NoteTxt')}>
                            <i className="fa-solid fa-a"></i>
                        </button>
                        <button type="button" title="Upload image" onClick={() => changeNoteType('NoteImg')}>
                            <i className="fa-solid fa-image"></i>
                        </button>
                        <button type="button" title="Upload video" onClick={() => changeNoteType('NoteVideo')}>
                            <i className="fa-brands fa-youtube"></i>
                        </button>
                        <button type="button" title="Create list" onClick={() => changeNoteType('NoteTodo')}>
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