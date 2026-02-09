import type {Location} from "@/types/location.ts";

export async function reverseGeocodeCityMapbox(
    lat: number,
    lng: number,
    accessToken: string = import.meta.env.VITE_MAPBOX_TOKEN
): Promise<Location> {
    const url = new URL(`https://api.mapbox.com/search/geocode/v6/reverse?`);
    url.searchParams.set("longitude", `${lng}`);
    url.searchParams.set("latitude", `${lat}`);
    url.searchParams.set("types", "place,locality,neighborhood");
    url.searchParams.set("limit", `${1}`);
    url.searchParams.set("language", "en");
    url.searchParams.set("access_token", accessToken);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Mapbox reverse geocoding failed for lat=${lat} lng=${lng}: ${response.statusText}`);
    }

    const data = await response.json();
    const property = data.features?.[0]?.properties;
    if (!property) return {lat:lat, lng:lng};
    const context = property.context;
    if(!context) return {lat:lat, lng:lng};

    return {
        lat: lat,
        lng: lng,
        city: context?.place?.name ?? "",
        region: context.region.name,
        country: context.country.name,
        neighborhood: context?.neighborhood?.name ?? "",
        locationLabel: property.name,
    };
}
