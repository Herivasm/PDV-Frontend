import { Supplier } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteSupplierForm({ supplierId }: { supplierId: Supplier['id'] }) {
    const handleDeleteSupplier = async () => {
        "use server"

        const url = `${process.env.API_URL}/suppliers/${supplierId}`
        const req = await fetch(url, {
            method: 'DELETE'
        })

        await req.json()

        revalidatePath('/admin/suppliers')
    }

    return (
        <form
            action={handleDeleteSupplier}
        >
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value='Eliminar'
            />
        </form>
    )
}