import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodo } from './NoteTodo.jsx';
import { ColorChooser } from './ColorChooser.jsx';

const { useState, useRef, useEffect } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {

    const [isColorChooserOpen, setIsColorChooserOpen] = useState(false)
    const noteRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                setIsColorChooserOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleUpdateNote(updatedContent) {
        onUpdateNote(note.id, { ...note, info: { ...note.info, txt: updatedContent } })
    }

    function handleColorChange(color) {
        onUpdateNote(note.id, { ...note, style: { ...note.style, backgroundColor: color } })
        setIsColorChooserOpen(false)
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
                    <NoteVideo content={note.info.url} />
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

    const noteStyle = note.style && note.style.backgroundColor
        ? { backgroundColor: note.style.backgroundColor }
        : {}


    return (
        <article className="note-preview" style={noteStyle} ref={noteRef}>
            <div className="note-content">
                {renderNoteContent()}
            </div>
            <section className="note-controls">
                {isColorChooserOpen ? (
                    <ColorChooser onColorChange={handleColorChange} />
                ) : (
                    <React.Fragment>
                        <button onClick={() => setIsColorChooserOpen(true)}>
                            <i className="fa-solid fa-palette"></i>
                        </button>
                        <button onClick={() => onRemoveNote(note.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </React.Fragment>
                )}
            </section>
        </article>
    )
}