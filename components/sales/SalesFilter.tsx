"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/src/api";
import SalesSummary from "./SalesSummary";
import { formatCurrency } from "@/src/utils";

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function SalesFilter() {
    const [date, setDate] = useState<Value>(new Date())

    const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')

    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSales(formattedDate)
    })

    const total = data?.reduce((total, sale) => total + sale.total, 0) ?? 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="es"
                />
                <p className="mt-5 text-lg font-bold text-left">Total del día: {''}
                    <span className="font-normal">{formatCurrency(total)}</span>
                </p>
            </div>

            <div>
                {isLoading && <p className="text-lg text-center">Cargando...</p>}

                {data ? data.length ? data.map(sale => (
                    <SalesSummary
                        key={sale.id}
                        sale={sale}
                    />
                )) : <p className="text-lg text-center">No hay ventas en esta fecha</p> : null}


            </div>
        </div>
    )
}