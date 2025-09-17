import React, { useEffect, useState } from 'react'
import { Todo } from './types'
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      setError('Failed to load todos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCreate = async (todo: Omit<Todo, 'id'>) => {
    try {
      const newTodo = await createTodo(todo)
      setTodos([...todos, newTodo])
    } catch {
      setError('Failed to create todo.')
    }
  }

  const handleUpdate = async (updated: Todo) => {
    try {
      const newTodo = await updateTodo(updated)
      setTodos(todos.map((t) => (t.id === newTodo.id ? newTodo : t)))
      setEditingTodo(null)
    } catch {
      setError('Failed to update todo.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((t) => t.id !== id))
    } catch {
      setError('Failed to delete todo.')
    }
  }

  return (
    <div className="container">
      <h1>ToDo App</h1>
      {error && <p role="alert" className="error">{error}</p>}
      <TodoForm onSubmit={editingTodo ? handleUpdate : handleCreate} editingTodo={editingTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          onEdit={(todo) => setEditingTodo(todo)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App
