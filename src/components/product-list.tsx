import { useCart } from "@/context/cart-context"
import { Plus } from "lucide-react"

export type Product = {
    id: number
    name: string
    price: number
}

const products: Product[] = [
    { id: 1, name: "Starter", price: 9 },
    { id: 2, name: "Team", price: 29 },
    { id: 3, name: "Business", price: 79 },
]

export function ProductList() {
    const { dispatch } = useCart()

    return (
        <section className="shop-panel">
        <div className="shop-heading">
            <p className="eyebrow">Monthly plans</p>
            <h1>Choose your workspace.</h1>
            <p className="lede">
            Simple subscriptions for keeping your work moving.
            </p>
        </div>
        <div className="product-grid">
            {products.map((product) => (
            <article className="product-card" key={product.id}>
                <div className="product-number">0{product.id}</div>
                <h2>{product.name}</h2>
                <p>${product.price.toFixed(2)} / month</p>
                <button
                className="shop-button"
                onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
                type="button"
                >
                <Plus /> Add to cart
                </button>
            </article>
            ))}
        </div>
        </section>
    )
}
