import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Categoría no encontrada</Heading>

            <p>Tal vez quieras volver a {''}
                <Link className="text-blue-400" href={'/admin/categories?page=1'}>
                    Categorías
                </Link></p>
        </div>
    )
}