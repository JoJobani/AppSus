const { useState, useRef, useEffect } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(note.info.txt)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            textareaRef.current.focus()
        }
    }, [isEditing])

    function handleEdit() {
        setIsEditing(true)
    }

    function handleBlur() {
        setIsEditing(false)
        if (editedText !== note.info.txt) {
            onUpdateNote(note.id, { ...note, info: { ...note.info, txt: editedText } })
        }
    }

    return (
        <article className="note-preview">
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleBlur}
                />
            ) : (
                <p className="note-content" onClick={handleEdit}>{editedText}</p>
            )}
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