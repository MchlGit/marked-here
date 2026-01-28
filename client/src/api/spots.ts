import {apiFetch} from "./http.ts";
import type {Spot, CreateSpotInput} from "../types/spot";


export function fetchSpots() {
    return apiFetch<Spot[]>("api/spots");
}

export async function createSpot(input: CreateSpotInput){
    return apiFetch<Spot>("api/spots", {
        method: "POST",
        body: JSON.stringify(input),
    })
}