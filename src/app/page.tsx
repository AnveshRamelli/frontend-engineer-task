import DiscoveryMapWrapper from "@/components/discovery-map-wrapper";
import { PropertyListing } from "@/data/property-listing";
import { Metadata } from "next";

//TODO : Add meta data for this page
// Page should serve via SSR
// Do not add "use client" declarative

// Added metadata for the page to improve SEO and provide a better user experience.
export const metadata: Metadata = {
  title: "Discover Properties on Map",
  description: "Explore properties visually with interactive map discovery",
};

// TODO: Create a List view for these properties.
// Use your own imagination while designing, please don't copy Propsoch's current UI.
// We don't like it either.
// Add pagination
// You can modify the Property Listing however you want. If you feel like creating an API and implementing pagination via that, totally your call.

export default async function Page() {
  // We can implement data fetching from DB or API here in future.
  const data = PropertyListing;

  return (
    <div className="w-screen h-screen">
      <DiscoveryMapWrapper  allFilteredData={data} />
    </div>
  );
}
