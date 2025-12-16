// components/property-card.tsx
import { PropertyProject } from "@/types/types"
import { formatPrice } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"

export default function PropertyCard({
  project,
}: {
  project: PropertyProject
}) {
  const isSoldOut = project.projectStatus !== "available"

  const href = `/property-for-sale-in/${project.city.toLowerCase()}/${project.slug.toLowerCase()}/${project.id}`

  return (
    <Link href={href} target="_blank" className="block">
      <div className="overflow-hidden rounded-xl border border-black/10 bg-white transition hover:shadow-md">
        {/* Image section */}
        <div className="relative h-56 w-full">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className={`object-cover ${
              isSoldOut ? "grayscale" : ""
            }`}
          />

          {/* Propscore */}
          <div className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
            Propscore · {project.propscore}/5
          </div>

          {/* Sold out badge */}
          {isSoldOut && (
            <div className="absolute right-3 top-3 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">
              Sold Out
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-1 text-lg font-semibold text-black">
            {project.name}
          </h3>

          <p className="text-sm text-black/60">
            {project.micromarket}, {project.city}
          </p>

          <p className="text-base font-medium text-black">
            {formatPrice(project.minPrice, false)} –{" "}
            {formatPrice(project.maxPrice, false)}
          </p>

          <div className="flex justify-between pt-2 text-sm text-black/60">
            <span>{project.typologies.join(", ")}</span>
            <span>
              {project.minSaleableArea} – {project.maxSaleableArea} sqft
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3">
            <span className="text-xs font-medium text-black/70">
              {project.type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
