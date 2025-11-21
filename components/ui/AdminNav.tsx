import Link from "next/link";
import Logo from "./Logo";

export default function AdminNav() {
    return (
        <header className="px-10 py-5 bg-[#0047FF] flex justify-between">
            <div className="flex gap-5 text-white">
                <Logo />
            </div>

            <div className="flex gap-2 items-center">
                <Link
                    href={'/admin/sales'}
                    className="rounded text-white font-bold p-2"
                >Ventas</Link>

                <Link
                    href={'/admin/products'}
                    className="rounded text-white font-bold p-2"
                >Productos</Link>

                <Link
                    href={'/admin/categories'}
                    className="rounded text-white font-bold p-2"
                >Categorías</Link>

                <Link
                    href={'/admin/suppliers'}
                    className="rounded text-white font-bold p-2"
                >Proveedores</Link>

                <Link
                    href={'/'}
                    className="rounded bg-white font-bold py-2 px-10 text-[#0047FF]"
                >Tienda</Link>
            </div>
        </header>
    )
}