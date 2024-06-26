import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes,onRemoveNote }) {
    return (
        <ul className='note-list'>
            {notes.map(note => (
                <li key={note.id} className="note-list-item">
                    <NotePreview note={note} onRemoveNote={onRemoveNote} />
                </li>
            ))}
        </ul>
    )
}
