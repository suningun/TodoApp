import { Button } from "@/components/ui/button"
import { useFetch } from "@/hooks/use-fetch"
import { ArrowUpRight, RefreshCw } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export type User = {
    id: number
    name: string
    username: string
    email: string
    address?: { city: string }
    company: { name: string; catchPhrase?: string }
}

type DirectoryState = "loading" | "error" | "empty" | "success"

export function UserDirectory() {
    const [retry, setRetry] = useState(0)
    const {
        data: users,
        loading,
        error,
    } = useFetch<User[]>(
        `https://jsonplaceholder.typicode.com/users?retry=${retry}`
    )
    const state: DirectoryState = loading
        ? "loading"
        : error
        ? "error"
        : users && users.length === 0
            ? "empty"
            : "success"

    return (
        <section className="page-section directory-page">
        <div className="section-heading">
            <div>
            <p className="eyebrow">People</p>
            <h1>User directory</h1>
            <p className="lede">A live directory sourced from JSONPlaceholder.</p>
            </div>
            <span className="count-label">
            {state === "success" ? `${users?.length ?? 0} members` : "Live data"}
            </span>
        </div>

        {state === "loading" && <DirectorySkeleton />}
        {state === "error" && (
            <div className="state-panel">
            <p className="state-icon">!</p>
            <h2>We couldn&apos;t reach the directory.</h2>
            <p>Check your connection and try again.</p>
            <Button onClick={() => setRetry((value) => value + 1)}>
                <RefreshCw /> Try again
            </Button>
            </div>
        )}
        {state === "empty" && (
            <div className="state-panel">
            <h2>No users found.</h2>
            <p>The directory is currently empty.</p>
            </div>
        )}
        {state === "success" && users && (
            <div className="user-grid">
            {users.map((user) => (
                <Link className="user-card" key={user.id} to={`/users/${user.id}`}>
                <div className="avatar">
                    {user.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="user-card-copy">
                    <h2>{user.name}</h2>
                    <p>@{user.username.toLowerCase()}</p>
                    <span>{user.company.name}</span>
                </div>
                <ArrowUpRight className="card-arrow" />
                </Link>
            ))}
            </div>
        )}
        </section>
    )
}

function DirectorySkeleton() {
    return (
        <div className="user-grid" aria-label="Loading users">
        {Array.from({ length: 6 }, (_, index) => (
            <div className="user-card skeleton-card" key={index}>
            <div className="skeleton avatar" />
            <div className="user-card-copy">
                <div className="skeleton skeleton-line wide" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
            </div>
            </div>
        ))}
        </div>
    )
}
