import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CreateSaleDto, Product, ShoppingCart, ErrorResponseSchema,  } from "../schemas";

interface Store {
    total: number 
    contents: ShoppingCart
    addToCart: (product: Product) => void
    updateQuantity: (id: Product['id'], quantity: number) => void
    removeFromCart: (id: Product['id']) => void
    calculateTotal: () => void
    clearCart: () => void
    createOrder: () => Promise<void>
}

const initialState = {
    total: 0,
    contents: [],
}

export const useStore = create<Store>()(devtools((set, get) => ({
    ...initialState,

    addToCart: (product) => {
        const { id: productId, categoryId, supplierId, ...data } = product
        let contents: ShoppingCart = []
        const duplicated = get().contents.findIndex(item => item.productId === productId)

        if (duplicated >= 0) {
            if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return

            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            } : item)

        } else {
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId
            }]
        }

        set(() => ({
            contents
        }))
        get().calculateTotal() 
    },

    updateQuantity: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? { ...item, quantity } : item)
        set(() => ({ contents }))
        get().calculateTotal() 
    },

    removeFromCart: (id) => {
        set((state) => ({
            contents: state.contents.filter(item => item.productId !== id)
        }))
        get().calculateTotal() 
    },

    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        set(() => ({
            total
        }))
    },

    clearCart: () => {
        set(() => ({
            ...initialState
        }))
    },

    createOrder: async () => {
        const { total, contents } = get();

        if (!contents.length) {
            throw new Error('El carrito está vacío');
        }

        const itemsDto = contents.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        const createSaleDto: CreateSaleDto = {
            total: total,
            items: itemsDto,
        };

        const url = `${process.env.NEXT_PUBLIC_API_URL}/sales`;
        const req = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createSaleDto)
        });

        if (!req.ok) {
            const errorJson = await req.json();
            const error = ErrorResponseSchema.parse(errorJson);
            throw new Error(error.message[0]);
        }

        get().clearCart();
    }
})))