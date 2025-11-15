"use client"

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { CategoriesApiResponseSchema, Category } from "@/src/schemas";
import Link from "next/link";

async function getCategories() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=100` 
    const req = await fetch(url)

    if (!req.ok) {
        throw new Error('No se pudieron cargar las categorías');
    }

    const json = await req.json()
    const response = CategoriesApiResponseSchema.parse(json) 

    return response.data
}

export default function MainNav() {
    const [categories, setCategories] = useState<Category[]>([])
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter(); 
    const activeCategoryId = searchParams.get('category');

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(error => console.error(error))
    }, [])

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        
        const href = categoryId ? `${pathname}?category=${categoryId}` : pathname;
        
        router.push(href);
    };

    return (
        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">

            <nav className="flex flex-col md:flex-row gap-4 items-center mt-5 md:mt-0">
                
                <select
                    className="bg-gray-700 text-white font-bold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    value={activeCategoryId || ''} 
                    onChange={handleFilterChange} 
                >
                    <option value="" className="bg-white text-black">Todos</option>
                    
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                            className="bg-white text-black" 
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <Link
                    href={'/admin/sales'}
                    className="rounded bg-blue-400 font-bold py-2 px-10"
                >
                    Panel de Administración
                </Link>
            </nav>
        </header>
    )
}