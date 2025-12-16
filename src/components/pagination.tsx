"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Button } from "./button"

export default function Pagination({
  total,
  page,
  pageSize,
}: {
  total: number
  page: number
  pageSize: number
}) {
  const totalPages = Math.ceil(total / pageSize)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(nextPage))
    router.push(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          onClick={() => goToPage(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
