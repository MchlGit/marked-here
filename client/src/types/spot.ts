export type Spot = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
    city: string;
    country: string;
    region: string;
    neighborhood: string;
    locationLabel: string;
    createdAt: string;
}

export type CreateSpotInput = {
    name: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    region: string;
    neighborhood: string;
    locationLabel: string;
    rating: number;
};