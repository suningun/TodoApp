import { AddTodo } from "@/components/todos"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

describe("AddTodo", () => {
    it("accepts a labeled todo and submits what the user typed", async () => {
        const user = userEvent.setup()
        const onAdd = vi.fn()

        render(<AddTodo onAdd={onAdd} />)

        const input = screen.getByLabelText("New todo")
        await user.type(input, "Book a dentist appointment")
        await user.click(screen.getByRole("button", { name: "Add todo" }))

        expect(onAdd).toHaveBeenCalledWith("Book a dentist appointment")
        expect(input).toHaveValue("")
    })

    it("shows validation and removes it after a valid submission", async () => {
        const user = userEvent.setup()
        const onAdd = vi.fn()

        render(<AddTodo onAdd={onAdd} />)

        await user.click(screen.getByRole("button", { name: "Add todo" }))
        expect(screen.getByRole("alert")).toHaveTextContent(
        "Enter a todo before adding it."
        )

        await user.type(screen.getByLabelText("New todo"), "Call the bank")
        await user.click(screen.getByRole("button", { name: "Add todo" }))

        expect(screen.queryByRole("alert")).toBeNull()
        expect(onAdd).toHaveBeenCalledWith("Call the bank")
    })
})
