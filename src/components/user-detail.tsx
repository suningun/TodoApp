import type { User } from "@/components/user-directory"
import { ArrowLeft, Mail, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export function UserDetail() {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [status, setStatus] = useState<"loading" | "error" | "success">(
        "loading"
    )

    useEffect(() => {
        let cancelled = false

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
            if (!response.ok) throw new Error("User not found")
            return response.json() as Promise<User>
        })
        .then((nextUser) => {
            if (cancelled) return
            setUser(nextUser)
            setStatus("success")
        })
        .catch(() => {
            if (!cancelled) setStatus("error")
        })

    return () => {
        cancelled = true
        }
    }, [id])

    if (status === "loading")
        return (
        <div className="state-panel page-section">
            <div className="spinner" />
            <p>Loading profile...</p>
        </div>
        )
    if (status === "error" || !user)
        return (
        <div className="state-panel page-section">
            <h1>User not found</h1>
            <p>This profile is no longer available.</p>
            <Link className="back-link" to="/users">
            <ArrowLeft /> Back to directory
            </Link>
        </div>
        )

    return (
        <section className="page-section detail-page">
        <Link className="back-link" to="/users">
            <ArrowLeft /> Back to directory
        </Link>
        <div className="profile-header">
            <div className="profile-avatar">
            {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
            <p className="eyebrow">Member profile</p>
            <h1>{user.name}</h1>
            <p className="lede">@{user.username.toLowerCase()}</p>
            </div>
        </div>
        <div className="profile-details">
            <div>
            <Mail />
            <span>{user.email}</span>
            </div>
            <div>
            <MapPin />
            <span>{user.address?.city ?? "Location unavailable"}</span>
            </div>
        </div>
        <div className="company-note">
            <p className="eyebrow">Works at</p>
            <h2>{user.company.name}</h2>
            <p>{user.company.catchPhrase ?? "Part of the Daymark directory"}</p>
        </div>
        </section>
    )
}
