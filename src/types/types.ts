import { SVGProps } from "react"

export interface PropertyProject {
  id: number
  name: string
  minPrice: number
  maxPrice: number
  typologies: string[]
  minSaleableArea: number
  maxSaleableArea: number
  micromarket: string
  possessionDate: string
  propscore: number
  city: string
  slug: string
  image: string
  isWishlisted?: boolean
  type: "apartment" | "villa" | "plot"
  projectStatus: string
  alt: string
  latitude: number
  longitude: number
}

export interface LocationType {
  name: string
  lat: number
  lon: number
  distance?: number
  duration?: number
  googlePlaceId?: string
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}