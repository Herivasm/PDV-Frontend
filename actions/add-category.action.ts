"use server"

import { ErrorResponseSchema, CategoryFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addCategory(prevState: ActionStateType, formData: FormData) {
    const category = CategoryFormSchema.safeParse({
        name: formData.get('name'),
    })

    if (!category.success) {
        return {
            errors: category.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category.data) 
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
        success: `Categoría "${category.data.name}" agregada correctamente`
    }
}