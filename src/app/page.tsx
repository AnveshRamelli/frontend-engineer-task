import DiscoveryMapWrapper from "@/components/discovery-map-wrapper";
import Header from "@/components/header";
import PropertyList from "@/components/property-list";
import { PropertyListing } from "@/data/property-listing";
import { Metadata } from "next";

export const dynamic = "force-dynamic"

//TODO : Add meta data for this page
// Page should serve via SSR
// Do not add "use client" declarative

// Added metadata for the page to improve SEO and provide a better user experience.
export const metadata: Metadata = {
  title: "Propsoch - Discover Properties for Sale",
  description: "Discover and Explore Properties Seamlessly with Propsoch",


};

// TODO: Create a List view for these properties.
// Use your own imagination while designing, please don't copy Propsoch's current UI.
// We don't like it either.
// Add pagination
// You can modify the Property Listing however you want. If you feel like creating an API and implementing pagination via that, totally your call.
// [Done]

const PAGE_SIZE = 10

export default async function Page({
  searchParams,
}: {
  searchParams: { view?: string; page?: string; q?: string}
}) {
  const params = await searchParams
  const view = params.view ?? "list";
  const query = params.q ?? "";
  const page = Number(params.page ?? 1)

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const filteredProjects = PropertyListing.projects.filter((p) => {
  if (!query) return true

  return (
    p.name.toLowerCase().includes(query) ||
    p.city.toLowerCase().includes(query) ||
    p.micromarket.toLowerCase().includes(query) ||
    p.typologies.some((t) => t.toLowerCase().includes(query))
  )
})

  const paginatedProjects = filteredProjects.slice(start, end)

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header/>

      {/* Main content */}
      <main className="h-[calc(100vh-56px)]">
        {view === "map" ? (
          <DiscoveryMapWrapper allFilteredData={PropertyListing} />
        ) : (
          <PropertyList
            projects={paginatedProjects}
            total={filteredProjects.length}
            page={page}
            pageSize={PAGE_SIZE}
          />
        )}
      </main>
    </div>
  )
}
