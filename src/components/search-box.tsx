import { useDebounce } from "@/hooks/use-debounce"
import { Search } from "lucide-react"
import { useState } from "react"

export function SearchBox() {
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 500)

    return (
        <section className="search-demo" aria-labelledby="search-demo-title">
        <div className="search-demo-heading">
            <div>
            <p className="eyebrow">Todo workspace</p>
            <h2 id="search-demo-title">Find a task</h2>
            </div>
            <Search aria-hidden="true" />
        </div>
        <label className="search-label" htmlFor="task-search">
            Search your todos
        </label>
        <input
            aria-label="Search your todos"
            className="text-input"
            id="task-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your todo list"
            value={query}
        />
        <div className="search-values" aria-live="polite">
            <p>
            Raw value: <strong>{query || "(empty)"}</strong>
            </p>
            <p>
            Debounced value: <strong>{debouncedQuery || "(empty)"}</strong>
            </p>
        </div>
        </section>
    )
}
