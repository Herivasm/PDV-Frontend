import z from "zod";

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number(),
    supplierId: z.string()
})
export type Product = z.infer<typeof ProductSchema>

export const ProductsApiResponseSchema = z.object({
    data: z.array(ProductSchema),
    meta: z.object({
        totalPages: z.number(),
        page: z.number(),
        lastPage: z.number(),
    })
});

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})
export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoriesApiResponseSchema = z.object({
    data: z.array(CategorySchema)
});

export type Category = z.infer<typeof CategorySchema>

export const CategoryFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre de la categoría no puede ir vacío' })
})

export const SupplierSchema = z.object({
    id: z.string(),
    name: z.string(),
    contact: z.string()
})
export const SuppliersResponseSchema = z.array(SupplierSchema)
export const SuppliersApiResponseSchema = z.object({
    data: z.array(SupplierSchema)
});

export type Supplier = z.infer<typeof SupplierSchema>

export const SupplierFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del proveedor no puede ir vacío' }),
    contact: z.string()
        .min(1, { message: 'La información de contacto no puede ir vacía' })
})

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

const ShoppingCartItemsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: z.string(),
    quantity: z.number()
})

export const ShoppingCartSchema = z.array(ShoppingCartItemsSchema)
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartItemsSchema>

const OrderItemsSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number()
})
export const OrderSchema = z.object({
    total: z.number(),
    items: z.array(OrderItemsSchema).min(1, { message: 'El carrito no puede ir vacio' })
})

export const SuccessResponseSchema = z.object({
    message: z.string()
})
export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
})

export const ItemsSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema
})

export const SaleItemSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    price: z.number(),
    productId: z.string(),
    saleId: z.string(),
    product: ProductSchema
})

export const SaleResponseSchema = z.object({
    id: z.string(),
    total: z.string(),
    transactionDate: z.string(),
    items: z.array(ItemsSchema)
})

export const SaleSchema = z.object({
    id: z.string(),
    total: z.number(),
    saleDate: z.string(),
    saleItems: z.array(SaleItemSchema)
})

export const SalesResponseSchema = z.array(SaleSchema)
export type Sale = z.infer<typeof SaleSchema>
export type CreateSaleDto = z.infer<typeof OrderSchema>

export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del producto no puede ir vacío' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El precio debe ser mayor a 0' }),
    image: z.string({ message: 'La imagen es obligatoria' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.coerce.number({ message: 'La categoría no es válida' }),
    supplierId: z.string()
        .min(1, { message: 'El proveedor no puede ir vacío' })
})