import ProductSearch from "@/components/products/ProductSearch";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { CategoriesApiResponseSchema, ProductsApiResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCategories() {
    const url = `${process.env.API_URL}/categories?limit=1000`
    const req = await fetch(url, { cache: 'no-store' })

    if (!req.ok) return [];
    
    const json = await req.json();
    const response = CategoriesApiResponseSchema.safeParse(json);

    if (response.success) {
        return response.data.data;
    }
    
    return [];
}

async function getProducts(page: number, limit: number, search?: string, category?: string) {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    if (search) params.set('search', search);
    if (category) params.set('category', category);

    const url = `${process.env.API_URL}/products?${params.toString()}`
    const req = await fetch(url, { cache: 'no-store' })

    if (!req.ok) {
        throw new Error('No se pudieron obtener los productos');
    }

    const json = await req.json()
    const data = ProductsApiResponseSchema.parse(json)

    return data
}

type SearchParams = Promise<{
    page: string,
    search?: string,
    category?: string
}>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page: pageString, search, category } = await searchParams
    const page = pageString ? +pageString : 1

    if (!isValidPage(page)) redirect('/admin/products?page=1')

    const productsPerPage = 10
    const [{ data: products, meta }, categories] = await Promise.all([getProducts(page, productsPerPage, search, category), getCategories()])

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

            <ProductSearch categories={categories} />

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