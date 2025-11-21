import AddSupplierForm from "@/components/suppliers/AddSupplierForm";
import SupplierForm from "@/components/suppliers/SupplierForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewSupplierPage() {
    return (
        <>
            <Link
                href='/admin/suppliers?page=1'
                className="rounded bg-[#0047FF] text-white font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Nuevo Proveedor</Heading>

            <AddSupplierForm >
                <SupplierForm />
            </AddSupplierForm>

        </>
    )
}