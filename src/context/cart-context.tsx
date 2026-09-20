/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useReducer,
    type Dispatch,
    type ReactNode,
} from "react"

export type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

type AddItemAction = {
    type: "ADD_ITEM"
    payload: { id: number; name: string; price: number }
}

type RemoveItemAction = {
    type: "REMOVE_ITEM"
    payload: { id: number }
}

type UpdateQuantityAction = {
    type: "UPDATE_QUANTITY"
    payload: { id: number; quantity: number }
}

export type Action = AddItemAction | RemoveItemAction | UpdateQuantityAction

export function cartReducer(state: CartItem[], action: Action): CartItem[] {
    switch (action.type) {
        case "ADD_ITEM": {
        const existingItem = state.find((item) => item.id === action.payload.id)
        if (existingItem) {
            return state.map((item) =>
            item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        }

        return [...state, { ...action.payload, quantity: 1 }]
        }
        case "REMOVE_ITEM":
        return state.filter((item) => item.id !== action.payload.id)
        case "UPDATE_QUANTITY":
        if (action.payload.quantity <= 0) {
            return state.filter((item) => item.id !== action.payload.id)
        }

        return state.map((item) =>
            item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        default:
        return state
    }
}

type CartContextValue = {
    items: CartItem[]
    dispatch: Dispatch<Action>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, [])

    return (
        <CartContext.Provider value={{ items, dispatch }}>
        {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within CartProvider")
    }

    return context
}
