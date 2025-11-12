import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsApiResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(page: number, limit: number) {
    const url = `${process.env.API_URL}/products?page=${page}&limit=${limit}`
    const req = await fetch(url, { cache: 'no-store' }) 

    if (!req.ok) {
        throw new Error('No se pudieron obtener los productos');
    }

    const json = await req.json()
    const data = ProductsApiResponseSchema.parse(json) 

    return data
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page: pageString } = await searchParams
    const page = pageString ? +pageString : 1

    if (!isValidPage(page)) redirect('/admin/products?page=1')

    const productsPerPage = 10 
    const { data: products, meta } = await getProducts(page, productsPerPage)

    const totalPages = meta.lastPage

    if (page > totalPages && totalPages > 0) redirect('/admin/products?page=1')

    return (
        <>
            <Link
                href='/admin/products/new'
                className="rounded bg-blue-400 font-bold py-2 px-10"
            >
                Nuevo Producto
            </Link>

            <Heading>Administrar Productos</Heading>

            <ProductsTable
                products={products}
            />

            <Pagination
                page={meta.page}
                totalPages={totalPages}
            />
        </>
    )
}