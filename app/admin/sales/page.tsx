import SalesFilter from "@/components/sales/SalesFilter";
import Heading from "@/components/ui/Heading";
import { getSales } from "@/src/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default async function SalesPage() {
    const queryClient = new QueryClient()

    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd')

    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSales(formattedDate)
    })

    return (
        <>
            <Heading>Ventas</Heading>

            <p className="text-lg">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fechas</p>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <SalesFilter />
            </HydrationBoundary>
        </>
    )
}