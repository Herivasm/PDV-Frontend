import Heading from "@/components/ui/Heading";
import { SupplierSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditSupplierForm from "@/components/suppliers/EditSupplierForm";
import SupplierForm from "@/components/suppliers/SupplierForm";

async function getSupplier(id: string) {
    const url = `${process.env.API_URL}/suppliers/${id}`
    const req = await fetch(url)

    if (!req.ok) {
        notFound()
    }

    const json = await req.json()
    const supplier = SupplierSchema.parse(json)

    return supplier
}

type Params = Promise<{ id: string }>

export default async function EditSupplierPage({ params }: { params: Params }) {
    const { id } = await params

    const supplier = await getSupplier(id)

    return (
        <>
            <Link
                href='/admin/suppliers?page=1'
                className="rounded bg-[#0047FF] text-white font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Editar Proveedor: {supplier.name}</Heading>


            <EditSupplierForm>
                <SupplierForm
                    supplier={supplier}
                />
            </EditSupplierForm>
        </>
    )
}