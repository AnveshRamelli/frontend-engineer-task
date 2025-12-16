"use client";

import dynamic from "next/dynamic";


// Dynamically import the DiscoveryMap component
const DiscoveryMap = dynamic(() => import("./discovery-map"), { ssr: false });

// wrapper component to use DiscoveryMap
export default function DiscoveryMapWrapper(props: any) {
  return <DiscoveryMap {...props} />;
}