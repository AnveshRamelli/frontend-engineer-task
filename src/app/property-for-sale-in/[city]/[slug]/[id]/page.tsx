import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PropertyListing } from "@/data/property-listing"
import { formatPrice } from "@/utils/helpers"

type PageProps = {
  params: {
    city: string
    slug: string
    id: string
  }
}

function getPropertyById(id: string) {
  return PropertyListing.projects.find(
    (p) => p.id === Number(id)
  )
}

// Metadata (SSR)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
    const { id } = await params
  const property = getPropertyById(id)

  if (!property) return {}

  return {
    title: `${property.name} in ${property.micromarket}, ${property.city}`,
    description: `Buy ${property.typologies.join(
      ", "
    )} at ${property.name}. Prices from ${formatPrice(
      property.minPrice,
      false
    )}.`,
    openGraph: {
      title: property.name,
      images: [property.image],
    },
  }
}

// Page (SSR)
export default async function PropertyDetailsPage({ params }: PageProps) {

     const { id } = await params 
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <main className="mx-auto max-w-6xl p-6">
        <div className="relative mb-6 h-[420px] w-full overflow-hidden rounded-xl">
          <Image
            src={property.image}
            alt={property.alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-2xl font-semibold text-black">
          {property.name}
        </h1>
        <p className="mt-1 text-sm text-black/60">
          {property.micromarket}, {property.city}
        </p>

        {/* Details grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Info label="Price">
            {formatPrice(property.minPrice, false)} –{" "}
            {formatPrice(property.maxPrice, false)}
          </Info>
          <Info label="Configuration">
            {property.typologies.join(", ")}
          </Info>
          <Info label="Area">
            {property.minSaleableArea} – {property.maxSaleableArea} sqft
          </Info>
          <Info label="Developer">{property.developerName}</Info>
          <Info label="Type">{property.type}</Info>
          <Info label="Status">{property.projectStatus}</Info>
        </div>
      </main>
    </div>
  )
}

function Info({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-black/10 p-4">
      <p className="text-xs uppercase tracking-wide text-black/50">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-black">
        {children}
      </p>
    </div>
  )
}
