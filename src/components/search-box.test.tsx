import { SearchBox } from "@/components/search-box"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

describe("SearchBox", () => {
    it("shows the raw value immediately and the debounced value asynchronously", async () => {
        const user = userEvent.setup()

        render(<SearchBox />)

        await user.type(screen.getByLabelText("Search your todos"), "market")

        expect(screen.getByText(/Raw value:/)).toHaveTextContent("market")
        expect(screen.getByText(/Debounced value:/)).toHaveTextContent("(empty)")
        expect(
        await screen.findByText(
            (_, element) =>
            element?.tagName === "P" &&
            element.textContent?.includes("Debounced value: market") === true
        )
        ).toBeInTheDocument()
    })
})
