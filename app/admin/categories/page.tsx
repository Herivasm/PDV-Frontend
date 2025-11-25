import CategoriesTable from "@/components/categories/CategoriesTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { CategorySchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const CategoriesApiResponseSchema = z.object({
    data: z.array(CategorySchema),
    meta: z.object({
        totalPages: z.number(),
        page: z.number(),
        lastPage: z.number(),
    })
});

async function getCategories(page: number, limit: number) {
    const url = `${process.env.API_URL}/categories?page=${page}&limit=${limit}`
    const req = await fetch(url, { cache: 'no-store' })

    if (!req.ok) {
        throw new Error('No se pudieron obtener las categorías');
    }

    const json = await req.json()
    const data = CategoriesApiResponseSchema.parse(json)

    return data
}

type SearchParams = Promise<{ page?: string }>

export default async function CategoriesPage({ searchParams }: { searchParams: SearchParams }) {
    const { page: pageString } = await searchParams
    const page = pageString ? parseInt(pageString, 10) : 1

    if (!isValidPage(page)) redirect('/admin/categories?page=1')

    const categoriesPerPage = 10

    const { data: categories, meta } = await getCategories(page, categoriesPerPage)

    const totalPages = meta.lastPage

    if (page > totalPages && totalPages > 0) redirect('/admin/categories?page=1')

    return (
        <>
            <Link
                href='/admin/categories/new'
                className="rounded bg-[#0047FF] text-white font-bold py-2 px-10"
            >
                Nueva Categoría
            </Link>

            <Heading>Administrar Categorías</Heading>

            {
                categories.length ? (
                    <CategoriesTable
                        categories={categories}
                    />
                ) : (
                    <p className="text-xl text-center text-gray-900">Aún no hay categorías registradas</p>
                )
            }

            <Pagination
                page={meta.page}
                totalPages={totalPages}
            />
        </>
    )
}