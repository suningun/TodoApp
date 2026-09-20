import { SearchBox } from "@/components/search-box"
import {
  AddTodo,
  FilterBar,
  TodoList,
  type Filter,
  type Todo,
} from "@/components/todos"
import { useState } from "react"

type TodoPageProps = {
  todos: Todo[]
  onAdd: (text: string) => void
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onClearCompleted: () => void
}

export function TodoPage({
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
      <SearchBox />
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
