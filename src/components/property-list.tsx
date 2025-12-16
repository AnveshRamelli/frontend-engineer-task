"use client";

import PropertyCard from "./property-card";
import Pagination from "./pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PropertyProject } from "@/types/types";

export default function PropertyList({
  projects,
  total,
  page,
  pageSize,
}: {
  projects: any[];
  total: number;
  page: number;
  pageSize: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function onSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
      params.set("page", "1");
    } else {
      params.delete("q");
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex h-full bg-white text-black">
      {/* filters */}
      <aside className="w-64 border-r p-4 text-sm">
        <p className="mb-2 font-semibold">Filters</p>
        <p className="opacity-60">Coming soon</p>
      </aside>

      {/* properties list */}
      <section className="flex flex-1 flex-col overflow-y-auto p-4">
        {/* Search */}
        <input
          placeholder="Search for Developers, Locations or Projects"
          className="mb-4 rounded border px-3 py-2 text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {
            total === 0 ? (
              <p className="text-center col-span-full mt-10 text-gray-500">
                No properties found.
                </p>
            ) : (
              projects.map((project: PropertyProject) => (
                <PropertyCard key={project.id} project={project} />
              ))
            )
            
          }
        </div>

        {/* Pagination */}
        <Pagination total={total} page={page} pageSize={pageSize} />
      </section>
    </div>
  );
}
