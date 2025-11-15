"use client"

import { submitOrder } from "@/actions/submit-order.action"
import { useStore } from "@/src/store"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
    const total = useStore(state => state.total)
    const contents = useStore(state => state.contents)
    const clearCart = useStore(state => state.clearCart)

    const order = {
        total,
        items: contents.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    }

    const submitOrderWithData = submitOrder.bind(null, order)

    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            clearCart()
        }
    }, [state, clearCart])

    return (
        <form
            action={dispatch}
        >
            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase font-bold p-3"
                value='Confirmar Compra'
            />
        </form>
    )
}