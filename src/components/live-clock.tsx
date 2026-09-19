import { useEffect, useState } from "react"

export function LiveClock() {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 1000)
        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="live-clock" aria-label="Current time">
        <span className="live-dot" />
        <span>
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        </div>
    )
}
