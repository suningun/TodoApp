/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react"

export type User = {
    email: string
}

type AuthContextValue = {
    user: User | null
    signIn: (email: string) => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    function signIn(email: string) {
        setUser({ email })
    }

    function signOut() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context
}
