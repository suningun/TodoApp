import { LiveClock } from "@/components/live-clock"
import { useTheme } from "@/components/theme-provider"
import {
  AddTodo,
  FilterBar,
  TodoList,
  type Filter,
  type Todo,
} from "@/components/todos"
import { UserDetail } from "@/components/user-detail"
import { UserDirectory } from "@/components/user-directory"
import { ClipboardList, Moon, Sun, Users } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, Route, Routes } from "react-router-dom"

export function App() {
  const { theme, setTheme } = useTheme()
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Going to the market", completed: true },
    { id: 2, text: "Having dinner with family", completed: false },
    { id: 3, text: "Finish the assignment before time", completed: false },
  ])

  function addTodo(text: string) {
    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ])
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/todos">
          <span className="brand-mark">
            <img alt="Marker logo" src="/marker.svg" />
          </span>
          <span>Marker</span>
        </Link>
        <nav className="main-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link is-active" : "nav-link"
            }
            to="/todos"
          >
            <ClipboardList /> Todos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link is-active" : "nav-link"
            }
            to="/users"
          >
            <Users /> Directory
          </NavLink>
        </nav>
        <LiveClock />
        <button
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          type="button"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </header>
      <main className="main-content">
        <Routes>
          <Route
            element={
              <TodoPage
                onAdd={addTodo}
                onClearCompleted={() =>
                  setTodos((current) =>
                    current.filter((todo) => !todo.completed)
                  )
                }
                onDelete={(id) =>
                  setTodos((current) =>
                    current.filter((todo) => todo.id !== id)
                  )
                }
                onToggle={(id) =>
                  setTodos((current) =>
                    current.map((todo) =>
                      todo.id === id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                    )
                  )
                }
                todos={todos}
              />
            }
            path="/todos"
          />
          <Route element={<UserDirectory />} path="/users" />
          <Route element={<UserDetail />} path="/users/:id" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

type TodoPageProps = {
  todos: Todo[]
  onAdd: (text: string) => void
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onClearCompleted: () => void
}

function TodoPage({
  todos,
  onAdd,
  onToggle,
  onDelete,
  onClearCompleted,
}: TodoPageProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const visibleTodos = todos.filter(
    (todo) =>
      filter === "all" ||
      (filter === "completed" ? todo.completed : !todo.completed)
  )

  return (
    <section className="page-section todo-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Personal workspace</p>
          <h1>Make room for what matters.</h1>
          <p className="lede">
            A focused list for the work worth carrying forward.
          </p>
        </div>
        <span className="count-label">
          {todos.filter((todo) => !todo.completed).length} open
        </span>
      </div>
      <AddTodo onAdd={onAdd} />
      <TodoList todos={visibleTodos} onDelete={onDelete} onToggle={onToggle} />
      <FilterBar
        completedCount={todos.filter((todo) => todo.completed).length}
        filter={filter}
        onClearCompleted={onClearCompleted}
        onFilterChange={setFilter}
      />
    </section>
  )
}

function NotFound() {
  return (
    <div className="state-panel page-section">
      <p className="eyebrow">404</p>
      <h1>That view drifted away.</h1>
      <p>There&apos;s nothing at this address.</p>
      <Link className="back-link" to="/todos">
        Return to todos
      </Link>
    </div>
  )
}

export default App
