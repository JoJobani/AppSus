export function NotePreview({ note, onRemoveNote }) {
    const txt = note.info.txt

    return (
        <article className="note-preview">
            <p className="note-content">{txt}</p>
            <section className="note-controls">
                <button>
                    <i className="fa-solid fa-palette"></i>
                </button>
                <button onClick={()=> onRemoveNote(note.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </section>
        </article>
    )
}