export function NotePreview({ note }) {
    const txt = note.info.txt

    return (
        <article className="note-preview">
            <p className="note-content">{txt}</p>
            <section className="note-controls"> 
                <button>
                    <i className="fa-solid fa-palette"></i>
                </button>
                <button>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </section>
        </article>
    )
}