export function NoteVideo({ content }) {

    return (
        <div className="note-video">
            <iframe
                width="420"
                height="315"
                src={content.replace("watch?v=", "embed/")}>
            </iframe>
        </div>
    )
}