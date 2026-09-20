import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

function readStoredValue<T>(key: string, initialValue: T): T {
    try {
        const storedValue = localStorage.getItem(key)
        if (storedValue === null) {
        return initialValue
        }

        try {
        return JSON.parse(storedValue) as T
        } catch {
        return storedValue as T
        }
    } catch {
        return initialValue
    }
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
    ): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue))

    useEffect(() => {
        try {
        localStorage.setItem(key, JSON.stringify(value))
        } catch {
        // Storage can be unavailable in privacy-restricted browser contexts.
        }
    }, [key, value])

    return [value, setValue]
}
