import { LiveClock } from "@/components/live-clock"
import { NavBar } from "@/components/nav-bar"
import { useTheme } from "@/components/theme-provider"
import { type Todo } from "@/components/todos"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { NotFoundPage } from "@/pages/not-found"
import { ShopPage } from "@/pages/shop"
import { TodoPage } from "@/pages/todos"
import { UserDetailPage } from "@/pages/user-detail"
import { UsersPage } from "@/pages/users"
import { ClipboardList, Moon, ShoppingBag, Sun, Users } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, Route, Routes } from "react-router-dom"

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

function AppContent() {
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
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link is-active" : "nav-link"
            }
            to="/shop"
          >
            <ShoppingBag /> Shop
          </NavLink>
        </nav>
        <NavBar />
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
          <Route element={<UsersPage />} path="/users" />
          <Route element={<UserDetailPage />} path="/users/:id" />
          <Route element={<ShopPage />} path="/shop" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
