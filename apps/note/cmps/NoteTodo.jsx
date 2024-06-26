export function NoteTodo({ content }) {
    return (
        <div className="note-todo">
            <h3>{content.title}</h3>
            <ul>
                {content.todos.map((todo, index) => {
                    <li key={index}>
                        <input type="checkbox" checked={!!todo.doneAt} />
                        {console.log(todo.txt)}
                    </li>
                })}
            </ul>
        </div>
    )
}