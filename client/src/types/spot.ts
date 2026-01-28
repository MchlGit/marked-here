export type Spot = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
    createdAt: string;
}

export type CreateSpotInput = {
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
};