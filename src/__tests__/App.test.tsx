import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'
import axios from 'axios'
import { vi } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as unknown as {
  get: any
  post: any
  put: any
  delete: any
}

describe('App', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Task', status: 'pending' }
      ]
    })
  })

  it('renders todos and allows delete', async () => {
    mockedAxios.delete.mockResolvedValue({})
    render(<App />)

    await screen.findByText('Test Task')
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalled()
    })
  })

  it('adds new todo', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { id: 2, title: 'New Task', status: 'pending' }
    })

    render(<App />)
    const input = screen.getByLabelText(/title/i)
    const button = screen.getByText(/add task/i)

    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })
})
