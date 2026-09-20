import { useCart } from "@/context/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"

export function Cart() {
  const { items } = useCart()

  return (
    <section className="shop-panel cart-panel">
      <div className="shop-panel-heading">
        <div>
          <p className="eyebrow">Your subscriptions</p>
          <h2>Selected plans</h2>
        </div>
        <span className="count-label">
          {items.reduce((total, item) => total + item.quantity, 0)} items
        </span>
      </div>
      {items.length === 0 ? (
        <p className="empty-state">
          No plans selected. Choose a subscription above.
        </p>
      ) : (
        <CartLines />
      )}
    </section>
  )
}

function CartLines() {
  const { items, dispatch } = useCart()

  return (
    <div className="cart-list">
      {items.map((item) => (
        <div className="cart-line" key={item.id}>
          <div className="cart-line-copy">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)} / month</p>
          </div>
          <div
            className="quantity-controls"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              aria-label={`Decrease ${item.name}`}
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: { id: item.id, quantity: item.quantity - 1 },
                })
              }
              type="button"
            >
              <Minus />
            </button>
            <span>{item.quantity}</span>
            <button
              aria-label={`Increase ${item.name}`}
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: { id: item.id, quantity: item.quantity + 1 },
                })
              }
              type="button"
            >
              <Plus />
            </button>
          </div>
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          <button
            aria-label={`Remove ${item.name}`}
            className="remove-button"
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
            }
            type="button"
          >
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  )
}
