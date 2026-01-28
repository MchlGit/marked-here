import type { Spot } from "../types";

const initialState = {
    //Reviews

    // Spots
    nextSpotId: 3,
    spots: [
        {id: 1, name: "Big Cedar", latitude: 47.32, longitude: -133.42, rating: 4, createdAt: new Date().toISOString()},
        {id: 2, name: "Cool Maple", latitude: 48.32, longitude: -129.42, rating: 5, createdAt: new Date().toISOString()},
    ] as Spot[],
}

export let db = structuredClone(initialState);

export function resetDb() {
    db = structuredClone(initialState);
}