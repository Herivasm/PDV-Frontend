import ProductCard from "@/components/products/ProductCard"
import StoreSearch from "@/components/products/StoreSearch";
import { ProductsApiResponseSchema } from "@/src/schemas"

async function getProducts(categoryId?: string, search?: string) {
    const params = new URLSearchParams();

    params.set('limit', '30');

    if (categoryId) {
        params.set('category', categoryId);
    }

    if (search) {
        params.set('search', search);
    }

    const url = `${process.env.API_URL}/products?${params.toString()}`

    const req = await fetch(url, {
        next: {
            tags: ['products-by-category']
        }
    })

    if (!req.ok) {
        return []
    }

    const json = await req.json()
    const response = ProductsApiResponseSchema.parse(json)

    return response.data
}

type SearchParams = Promise<{ category?: string, search?: string }>

export default async function StorePage({ searchParams }: { searchParams: SearchParams }) {

    const { category: categoryId, search } = await searchParams
    const products = await getProducts(categoryId, search)

    return (
        <div className="px-5">
            <StoreSearch />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.length > 0 ? (

                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">No se encontraron productos.</p>
                )}
            </div>
        </div>
    )
}