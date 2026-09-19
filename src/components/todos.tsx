import { Button } from "@/components/ui/button"
import { Check, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export type Todo = {
    id: number
    text: string
    completed: boolean
}

type AddTodoProps = {
    onAdd: (text: string) => void
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState("")

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const nextText = text.trim()
        if (!nextText) return
        onAdd(nextText)
        setText("")
    }

    return (
        <form className="add-todo" onSubmit={handleSubmit}>
        <input
            aria-label="New todo"
            className="text-input"
            onChange={(event) => setText(event.target.value)}
            placeholder="What needs doing?"
            value={text}
        />
        <Button aria-label="Add todo" size="icon" type="submit">
            <Plus />
        </Button>
        </form>
    )
}

type TodoListProps = {
    todos: Todo[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return <p className="empty-state">Nothing here yet. Add a task to begin.</p>
    }

    return (
        <ul className="todo-list">
        {todos.map((todo) => (
            <li
            className={`todo-item ${todo.completed ? "is-complete" : ""}`}
            key={todo.id}
            >
            <button
                aria-label={`Mark ${todo.text} ${todo.completed ? "active" : "complete"}`}
                className="todo-check"
                onClick={() => onToggle(todo.id)}
                type="button"
            >
                {todo.completed && <Check />}
            </button>
            <span>{todo.text}</span>
            <button
                aria-label={`Delete ${todo.text}`}
                className="icon-button muted-icon"
                onClick={() => onDelete(todo.id)}
                type="button"
            >
                <Trash2 />
            </button>
            </li>
        ))}
        </ul>
    )
}

type Filter = "all" | "active" | "completed"
type FilterBarProps = {
    filter: Filter
    completedCount: number
    onFilterChange: (filter: Filter) => void
    onClearCompleted: () => void
}

export function FilterBar({
    filter,
    completedCount,
    onFilterChange,
    onClearCompleted,
    }: FilterBarProps) {
    return (
        <div className="filter-bar">
        <div className="filter-tabs" role="group" aria-label="Filter todos">
            {(["all", "active", "completed"] as Filter[]).map((option) => (
            <button
                className={
                filter === option ? "filter-button is-selected" : "filter-button"
                }
                key={option}
                onClick={() => onFilterChange(option)}
                type="button"
            >
                {option[0].toUpperCase() + option.slice(1)}
            </button>
            ))}
        </div>
        <button
            className="text-button"
            disabled={completedCount === 0}
            onClick={onClearCompleted}
            type="button"
        >
            Clear completed
        </button>
        </div>
    )
}

export type { Filter }
