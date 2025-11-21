"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function StoreSearch() {
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') || '';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="mb-5">
            <input
                type="text"
                placeholder="¿Qué producto buscas?"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0047FF] rounded-md"
                defaultValue={currentSearch}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}