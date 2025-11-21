"use client"

import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/ui/Modal"
import { toast } from "react-toastify"

export default function DeleteProductForm({ productId }: { productId: Product['id'] }) {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleDeleteProduct = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
            const req = await fetch(url, {
                method: 'DELETE'
            })

            const json = await req.json()

            if (!req.ok) {
                throw new Error(json.message || 'Error al eliminar')
            }

            toast.success('Producto eliminado correctamente')
            
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
                onConfirm={handleDeleteProduct}
                title="Eliminar Producto"
            >
                ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </Modal>
        </>
    )
}