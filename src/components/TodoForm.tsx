import React, { useEffect, useState } from 'react'
import { Todo } from '../types'

interface Props {
  onSubmit: (todo: Todo | Omit<Todo, 'id'>) => void
  editingTodo: Todo | null
}

const TodoForm: React.FC<Props> = ({ onSubmit, editingTodo }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'pending' | 'completed'>('pending')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setStatus(editingTodo.status)
    }
  }, [editingTodo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    setError('')
    if (editingTodo) {
      onSubmit({ ...editingTodo, title, status })
    } else {
      onSubmit({ title, status })
    }
    setTitle('')
    setStatus('pending')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit">{editingTodo ? 'Update' : 'Add'} Task</button>
    </form>
  )
}

export default TodoForm
