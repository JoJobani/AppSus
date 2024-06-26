const { useState, useRef, useEffect } = React

export function NoteTxt({ content, onUpdateNote }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(content)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            textareaRef.current.focus()
        }
    }, [isEditing])

    function handleEdit() {
        setIsEditing(true);
    }

    function handleBlur() {
        setIsEditing(false);
        if (editedText !== content) {
            onUpdateNote(editedText);
        }
    }

    return isEditing
        ? (<textarea
            ref={textareaRef}
            value={editedText}
            onChange={(ev) => setEditedText(ev.target.value)}
            onBlur={handleBlur}
        />
        ) : (
            <p className="note-content" onClick={handleEdit}>{content}</p>
        )

}