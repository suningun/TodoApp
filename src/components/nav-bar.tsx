import { useAuth } from "@/context/auth-context"

export function NavBar() {
    const { user, signIn, signOut } = useAuth()

    if (!user) {
        return (
        <button
            className="auth-button"
            onClick={() => signIn("user@example.com")}
            type="button"
        >
            Sign in
        </button>
        )
    }

    return (
        <div className="auth-bar">
        <span>Hi, {user.email}</span>
        <button className="auth-button" onClick={signOut} type="button">
            Sign out
        </button>
        </div>
    )
}
