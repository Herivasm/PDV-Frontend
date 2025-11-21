"use client"

import { updateCategory } from "@/actions/edit-category.action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditCategoryForm({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const updateCategoryWithId = updateCategory.bind(null, +id)
  const [state, dispatch] = useActionState(updateCategoryWithId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success)
      router.push('/admin/categories')
    }
  }, [state, router])

  return (
    <form
      className="space-y-5"
      action={dispatch}
    >
      {children}

      <input
        className="rounded bg-[#0047FF] text-white font-bold py-2 w-full cursor-pointer"
        type="submit"
        value="Guardar Cambios"
      />
    </form>
  )
}