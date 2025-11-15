import { SalesResponseSchema } from "../schemas";

export async function getSales(date: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sales?date=${date}`
    const req = await fetch(url)

    if (!req.ok) {
        throw new Error('Error al obtener las ventas');
    }

    const json = await req.json()
    const sales = SalesResponseSchema.parse(json)

    return sales
}