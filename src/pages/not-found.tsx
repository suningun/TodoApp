import { Link } from "react-router-dom"

export function NotFoundPage() {
    return (
        <div className="state-panel page-section">
        <p className="eyebrow">404</p>
        <h1>That view drifted away.</h1>
        <p>There&apos;s nothing at this address.</p>
        <Link className="back-link" to="/todos">
            Return to todos
        </Link>
        </div>
    )
}
