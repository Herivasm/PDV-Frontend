import { Supplier } from "@/src/schemas"

export default function SupplierForm({ supplier }: { supplier?: Supplier }) {
    return (
        <>
            <div className="space-y-2 ">
                <label
                    htmlFor="name"
                    className="block"
                >
                    Nombre Proveedor
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del Proveedor"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={supplier?.name}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="contact"
                    className="block"
                >
                    Contacto (Teléfono)
                </label>
                <input
                    id="contact"
                    type="text"
                    placeholder="Información de Contacto"
                    className="border border-gray-300 w-full p-2"
                    name="contact"
                    defaultValue={supplier?.contact}
                />
            </div>
        </>
    )
}