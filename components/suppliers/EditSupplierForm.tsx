"use client"

import { updateSupplier } from "@/actions/edit-supplier.action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditSupplierForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateSupplierWithId = updateSupplier.bind(null, id)

    const [state, dispatch] = useActionState(updateSupplierWithId, {
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
                className="rounded bg-[#0047FF] text-white font-bold py-2 w-full cursor-pointer"
                type="submit"
                value="Guardar Cambios"
            />
        </form>
    )
}