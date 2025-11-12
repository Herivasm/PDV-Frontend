import EditCategoryForm from "@/components/categories/EditCategoryForm";
import CategoryForm from "@/components/categories/CategoryForm";
import Heading from "@/components/ui/Heading";
import { CategorySchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCategory(id: string) {
    const url = `${process.env.API_URL}/categories/${id}`
    const req = await fetch(url)

    if (!req.ok) {
        notFound()
    }

    const json = await req.json()
    const category = CategorySchema.parse(json)

    return category
}

type Params = Promise<{ id: string }>

export default async function EditCategoryPage({ params }: { params: Params }) {
    const { id } = await params

    const category = await getCategory(id)

    return (
        <>
            <Link
                href='/admin/categories?page=1'
                className="rounded bg-blue-400 font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Editar Categoría: {category.name}</Heading>


            <EditCategoryForm>
                <CategoryForm
                    category={category}
                />
            </EditCategoryForm>
        </>
    )
}