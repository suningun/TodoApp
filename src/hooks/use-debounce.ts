import { useEffect, useRef, useState } from "react"

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value)
        }, delay)

        return () => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }
        }
    }, [delay, value])

    return debouncedValue
}
