import ProductCard from "@/components/products/ProductCard"
import { ProductsApiResponseSchema } from "@/src/schemas"

async function getProducts(categoryId?: string) {
    const params = new URLSearchParams();

    params.set('limit', '30');
    if (categoryId) {
        params.set('category', categoryId);
    }

    const url = `${process.env.API_URL}/products?${params.toString()}`

    const req = await fetch(url, {
        next: {
            tags: ['products-by-category']
        }
    })

    if (!req.ok) {
        throw new Error('No se pudieron cargar los productos');
    }

    const json = await req.json()
    const response = ProductsApiResponseSchema.parse(json)

    return response.data
}

type SearchParams = Promise<{ category?: string }>

export default async function StorePage({ searchParams }: { searchParams: SearchParams }) {

    const {category: categoryId} = await searchParams
    const products = await getProducts(categoryId)

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}