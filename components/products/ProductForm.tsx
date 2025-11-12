import { Product, CategoriesApiResponseSchema, SuppliersApiResponseSchema } from "@/src/schemas"
import UploadProductImage from "./UploadProductImage"

async function getCategories() {
    const url = `${process.env.API_URL}/categories?limit=1000` 
    const req = await fetch(url, { cache: 'no-store' })

    const json = await req.json()
    const response = CategoriesApiResponseSchema.parse(json)
    return response.data 
}

async function getSuppliers() {
    const url = `${process.env.API_URL}/suppliers?limit=1000`
    const req = await fetch(url, { cache: 'no-store' })

    const json = await req.json()
    const response = SuppliersApiResponseSchema.parse(json)
    return response.data
}

export default async function ProductForm({ product }: { product?: Product }) {
    const [categories, suppliers] = await Promise.all([
        getCategories(),
        getSuppliers()
    ])

    return (
        <>
            <div className="space-y-2 ">
                <label
                    htmlFor="name"
                    className="block"
                >Nombre Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="price"
                    className="block"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border border-gray-300 w-full p-2"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="inventory"
                    className="block"
                >Inventario</label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="categoryId"
                    className="block"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="supplierId"
                    className="block"
                >Proveedor</label>
                <select
                    id="supplierId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="supplierId"
                    defaultValue={product?.supplierId}
                >
                    <option value="">Seleccionar Proveedor</option>
                    {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                </select>
            </div>

            <UploadProductImage
                currentImage={product?.image}
            />
        </>
    )
}