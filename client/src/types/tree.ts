export type Tree = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
    createdAt: string;
}

export type CreateTreeInput = {
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
};