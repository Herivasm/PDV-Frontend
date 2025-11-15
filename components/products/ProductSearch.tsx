"use client"

import { Category } from "@/src/schemas";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function ProductSearch({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || '';

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set('page', '1');

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleSearch = useDebouncedCallback((term: string) => {
        updateQueryParams('search', term);
    }, 300);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQueryParams('category', e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-5">
            <input
                type="text"
                placeholder="Buscar producto por nombre..."
                className="border border-gray-300 w-full md:w-1/2 p-2"
                defaultValue={currentSearch}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <select
                className="border border-gray-300 w-full md:w-1/2 p-2 bg-white"
                value={currentCategory}
                onChange={handleCategoryChange}
            >
                <option value="">-- Todas las Categorías --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    );
}