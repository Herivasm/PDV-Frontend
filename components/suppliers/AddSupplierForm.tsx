"use client"

import { addSupplier } from "@/actions/add-supplier.action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AddSupplierForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const [state, dispatch] = useActionState(addSupplier, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/suppliers')
        }
    }, [state, router])

    return (
        <form
            className="space-y-5"
            action={dispatch}
        >
            {children}

            <input
                className="rounded bg-blue-400 font-bold py-2 w-full cursor-pointer"
                type="submit"
                value="Agregar Proveedor"
            />
        </form>
    )
}