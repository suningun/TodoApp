import { useCart } from "@/context/cart-context"

export function CheckoutSummary() {
    const { items } = useCart()
    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    return (
        <section className="checkout-summary">
        <div>
            <p className="eyebrow">Your monthly total</p>
            <h2>Subscription summary</h2>
        </div>
        <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
        </section>
    )
}
