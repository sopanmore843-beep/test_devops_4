import axios from 'axios'
import { Todo } from '../types'

const API_URL = 'http://localhost:3001/api/todos'

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const res = await axios.post(API_URL, todo)
  return res.data
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await axios.put(`${API_URL}/${todo.id}`, todo)
  return res.data
}

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}
