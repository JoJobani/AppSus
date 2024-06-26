export function NoteImg({ content, title }) {
    return (
        <div className="note-img">
            {title && <h3>{title}</h3>}
            <img src={content} alt={title} />
        </div>
    )
}