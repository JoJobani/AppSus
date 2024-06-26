import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodo } from './NoteTodo.jsx';

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {

    function handleUpdateNote(updatedContent) {
        onUpdateNote(note.id, { ...note, info: { ...note.info, txt: updatedContent } })
    }

    function renderNoteContent() {
        switch (note.type) {
            case 'NoteTxt':
                return (
                    <NoteTxt
                        content={note.info.txt}
                        onUpdateNote={handleUpdateNote}
                    />
                )
            case 'NoteImg':
                return (
                    <NoteImg content={note.info.url} title={note.info.title} />
                )
            case 'NoteVideo':
                return (
                    console.log('hi')
                    // <NoteVideo content={note.info.url} />
                )
            case 'NoteTodo':
                return (
                    <NoteTodo
                        content={note.info}
                        onUpdateNote={(updatedInfo) => onUpdateNote(note.id, { ...note, info: updatedInfo })}
                    />
                )
            default:
                return <p>Unsupported note type</p>
        }
    }

    return (
        <article className="note-preview">
            {renderNoteContent()}
            <section className="note-controls">
                <button>
                    <i className="fa-solid fa-palette"></i>
                </button>
                <button onClick={() => onRemoveNote(note.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </section>
        </article>
    )
}