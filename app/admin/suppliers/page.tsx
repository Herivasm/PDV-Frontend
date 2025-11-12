import SuppliersTable from "@/components/suppliers/SuppliersTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { SupplierSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const SuppliersApiResponseSchema = z.object({
    data: z.array(SupplierSchema),
    meta: z.object({
        totalPages: z.number(),
        page: z.number(),
        lastPage: z.number(),
    })
});

async function getSuppliers(page: number, limit: number) {
    const url = `${process.env.API_URL}/suppliers?page=${page}&limit=${limit}`
    const req = await fetch(url, { cache: 'no-store' })

    if (!req.ok) {
        throw new Error('No se pudieron obtener los proveedores');
    }

    const json = await req.json()
    const data = SuppliersApiResponseSchema.parse(json)

    return data
}

type SearchParams = Promise<{ page?: string }>


export default async function SuppliersPage({ searchParams }: { searchParams: SearchParams }) {
    const { page: pageString } = await searchParams
    const page = pageString ? parseInt(pageString, 10) : 1

    if (!isValidPage(page)) redirect('/admin/suppliers?page=1')

    const suppliersPerPage = 10

    const { data: suppliers, meta } = await getSuppliers(page, suppliersPerPage)

    const totalPages = meta.lastPage

    if (page > totalPages && totalPages > 0) redirect('/admin/suppliers?page=1')

    return (
        <>
            <Link
                href='/admin/suppliers/new'
                className="rounded bg-blue-400 font-bold py-2 px-10"
            >
                Nuevo Proveedor
            </Link>

            <Heading>Administrar Proveedores</Heading>

            <SuppliersTable
                suppliers={suppliers}
            />

            <Pagination
                page={meta.page}
                totalPages={totalPages}
            />
        </>
    )
}