"use client"

import { Category } from "@/src/schemas"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/ui/Modal"
import { toast } from "react-toastify"

export default function DeleteCategoryForm({ categoryId }: { categoryId: Category['id'] }) {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleDeleteCategory = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
            const req = await fetch(url, {
                method: 'DELETE'
            })

            const json = await req.json()

            if (!req.ok) {
                throw new Error(json.message || 'Error al eliminar')
            }

            toast.success('Categoría eliminada correctamente')
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
                onConfirm={handleDeleteCategory}
                title="Eliminar Categoría"
            >
                ¿Estás seguro? Si eliminas esta categoría, es posible que los productos asociados pierdan su clasificación.
            </Modal>
        </>
    )
}