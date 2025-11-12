"use server"

import { ErrorResponseSchema, SupplierFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addSupplier(prevState: ActionStateType, formData: FormData) {
    const supplier = SupplierFormSchema.safeParse({
        name: formData.get('name'),
        contact: formData.get('contact'),
    })

    if (!supplier.success) {
        return {
            errors: supplier.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/suppliers`
    const req = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplier.data)
    })

    const json = await req.json()

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)

        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    return {
        errors: [],
        success: `Proveedor "${supplier.data.name}" agregado correctamente`
    }
}