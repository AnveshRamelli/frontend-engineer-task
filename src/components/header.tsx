"use client"

import { HouseIcon } from "@/assets/house-icon"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./button"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const view =
    searchParams.get("view") === "map" ? "map" : "list"

  function setView(nextView: "map" | "list") {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", nextView)
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-[color:var(--primary)]"
        >
          <HouseIcon width={32} height={32} />
          Propsoch
        </Link>

        <div className="flex gap-2">
          <Button
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
          >
            Map view
          </Button>

          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            List view
          </Button>
        </div>
      </div>
    </header>
  )
}
