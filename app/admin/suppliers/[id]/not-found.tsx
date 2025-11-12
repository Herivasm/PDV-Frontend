import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Proveedor no encontrado</Heading>

            <p>Tal vez quieras volver a {''}
                <Link className="text-blue-400" href={'/admin/suppliers?page=1'}>
                    Proveedores
                </Link></p>
        </div>
    )
}