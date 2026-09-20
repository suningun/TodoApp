import { Cart } from "@/components/cart"
import { CheckoutSummary } from "@/components/checkout-summary"
import { ProductList } from "@/components/product-list"
import type { User } from "@/components/user-directory"
import { useFetch } from "@/hooks/use-fetch"

export function ShopPage() {
    return (
        <section className="page-section shop-page">
        <ProductList />
        <Cart />
        <CheckoutSummary />
        <FetchExample />
        </section>
    )
}

type FetchExampleUser = Pick<User, "id" | "email">

function FetchExample() {
    const { data, loading, error } = useFetch<FetchExampleUser[]>(
        "https://jsonplaceholder.typicode.com/users"
    )

    if (loading) return <p className="fetch-note">Loading users...</p>
    if (error) return <p className="fetch-note">{error}</p>
    if (!data) return null

    return (
        <p className="fetch-note">
        Typed fetch ready: {data.map((user) => user.email).join(", ")}
        </p>
    )
}
