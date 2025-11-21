import AddCategoryForm from "@/components/categories/AddCategoryForm";
import CategoryForm from "@/components/categories/CategoryForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewCategoryPage() {
    return (
        <>
            <Link
                href='/admin/categories?page=1'
                className="rounded bg-[#0047FF] text-white font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Nueva Categoría</Heading>

            <AddCategoryForm>
                <CategoryForm />
            </AddCategoryForm>

        </>
    )
}