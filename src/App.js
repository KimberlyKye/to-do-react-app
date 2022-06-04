import React, { useEffect } from 'react'
import TodoList from './Todo/Todolist'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 3000)
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function addTodo(title) {
    setTodos(todos.concat([{ title, id: Date.now(), completed: false }]))
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>To-do list</h1>
        <Modal></Modal>
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo}></AddTodo>
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No tasks yet...</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
