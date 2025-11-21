"use client"

import { Supplier } from "@/src/schemas"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/ui/Modal"
import { toast } from "react-toastify"

export default function DeleteSupplierForm({ supplierId }: { supplierId: Supplier['id'] }) {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleDeleteSupplier = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`
            const req = await fetch(url, {
                method: 'DELETE'
            })

            const json = await req.json()

            if (!req.ok) {
                throw new Error(json.message || 'Error al eliminar')
            }

            toast.success('Proveedor eliminado correctamente')
            setShowModal(false)
            router.refresh()

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <button
                type="button"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Eliminar
            </button>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteSupplier}
                title="Eliminar Proveedor"
            >
                ¿Estás seguro? Si eliminas este proveedor, es posible que los productos asociados pierdan su clasificación.
            </Modal>
        </>
    )
}