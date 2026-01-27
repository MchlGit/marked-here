import type { Tree } from "../types";

const initialState = {
    //Reviews

    // Trees
    nextTreeId: 3,
    trees: [
        {id: 1, name: "Big Cedar", latitude: 47.32, longitude: -133.42, rating: 4, createdAt: new Date().toISOString()},
        {id: 2, name: "Cool Maple", latitude: 48.32, longitude: -129.42, rating: 5, createdAt: new Date().toISOString()},
    ] as Tree[],
}

export let db = structuredClone(initialState);

export function resetDb() {
    db = structuredClone(initialState);
}