import { useEffect, useState } from "react"

type UseFetchResult<T> = {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

    async function request() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(url, { signal: controller.signal })
            if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
            }

            const result: T = await response.json()
            if (controller.signal.aborted) return
            setData(result)
        } catch (requestError) {
            if (requestError instanceof DOMException && requestError.name === "AbortError") {
            return
            }

            if (!controller.signal.aborted) {
            setError(requestError instanceof Error ? requestError.message : "Request failed")
            }
        } finally {
            if (!controller.signal.aborted) {
            setLoading(false)
            }
        }
    }

    void request()

        return () => controller.abort()
    }, [url])

    return { data, loading, error }
}
