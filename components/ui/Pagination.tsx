"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    page: number
    totalPages: number
}

export default function Pagination({ page, totalPages }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    const createPageUrl = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', newPage.toString())

        return `${pathname}?${params.toString()}`
    }

    return (
        <nav className="flex justify-center py-10">
            {page > 1 && (
                <Link
                    href={createPageUrl(page - 1)}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >
                    &laquo;
                </Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={createPageUrl(currentPage)}
                    className={`${page === currentPage ? 'font-black bg-gray-100' : ''} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={createPageUrl(page + 1)}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >
                    &raquo;
                </Link>
            )}
        </nav>
    )
}