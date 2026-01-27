import {apiFetch} from "./http.ts";
import type {Tree, CreateTreeInput} from "../types/tree";


export function fetchTrees() {
    return apiFetch<Tree[]>("api/trees");
}

export async function createTree(input: CreateTreeInput){
    return apiFetch<Tree>("api/trees", {
        method: "POST",
        body: JSON.stringify(input),
    })
}