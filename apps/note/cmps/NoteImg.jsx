export function NoteImg({ content, title }) {
    return (
        <div className="note-img">
            {title && <p>{title}</p>}
            <img src={content} alt={title} />
        </div>
    )
}