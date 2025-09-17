import React from 'react'
import { Todo } from '../types'

interface Props {
  todos: Todo[]
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

const TodoList: React.FC<Props> = ({ todos, onEdit, onDelete }) => {
  if (todos.length === 0) return <p>No tasks found.</p>

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, idx) => (
          <tr key={todo.id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
            <td>{todo.title}</td>
            <td>{todo.status}</td>
            <td>
              <button onClick={() => onEdit(todo)}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TodoList
