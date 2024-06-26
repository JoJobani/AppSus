export function NoteTodo({ content, onUpdateNote }) {
    const toggleTodo = (index) => {
        const updatedTodos = content.todos.map((todo, idx) => {
            if (idx === index) {
                return { ...todo, doneAt: todo.doneAt ? null : Date.now() };
            }
            return todo;
        });
        onUpdateNote({ ...content, todos: updatedTodos });
    };

    return (
        <div className="note-todo">
            <h3>{content.title}</h3>
            <ul>
                {content.todos.map((todo, index) => (
                    <li key={index} onClick={() => toggleTodo(index)}>
                        <span className={todo.doneAt ? 'done' : ''}>
                            {todo.txt}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}