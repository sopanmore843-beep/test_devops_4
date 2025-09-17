import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'
import { Todo } from '../src/types'
import path from 'path'

const app = express()
const PORT = 3001
const DB_PATH = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())

const readDB = async (): Promise<Todo[]> => {
  const data = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

const writeDB = async (data: Todo[]) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

app.get('/api/todos', async (req, res) => {
  const todos = await readDB()
  res.json(todos)
})

app.post('/api/todos', async (req, res) => {
  const todos = await readDB()
  const { title, status } = req.body
  const newTodo: Todo = {
    id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title,
    status
  }
  todos.push(newTodo)
  await writeDB(todos)
  res.status(201).json(newTodo)
})

app.put('/api/todos/:id', async (req, res) => {
  const todos = await readDB()
  const id = Number(req.params.id)
  const index = todos.findIndex(t => t.id === id)
  if (index === -1) return res.status(404).json({ message: 'Not found' })

  todos[index] = { ...todos[index], ...req.body }
  await writeDB(todos)
  res.json(todos[index])
})

app.delete('/api/todos/:id', async (req, res) => {
  const todos = await readDB()
  const id = Number(req.params.id)
  const newTodos = todos.filter(t => t.id !== id)
  await writeDB(newTodos)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
