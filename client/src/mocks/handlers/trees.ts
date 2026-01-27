import {http, HttpResponse} from "msw";
import {db} from "../db";
import type {Tree} from "../../types/tree";

export const treesHandlers = [
    // GET /api/trees
    http.get("/api/trees", () => {
        return HttpResponse.json(db.trees);
    }),

    // POST /api/trees
    http.post("/api/trees", async ({request}) => {
        const body = (await request.json()) as Partial<Tree>;

        // Validation to mimic API
        if (!body.name) {
            return HttpResponse.json({errors: ["Name field is required"]}, {status: 422});
        }
        if (typeof body.rating !== "number") {
            return HttpResponse.json({errors: ["Ratings field is required"]}, {status: 422});
        }
        if (body.rating < 0 || body.rating > 5) {
            return HttpResponse.json({errors: ["Ratings must be 0-5."]}, {status: 422});
        }
        if (!body.latitude || !body.longitude) {
            return HttpResponse.json({errors: ["Latitude/Longitude are required."]}, {status: 422});
        }

        const newTree: Tree = {
            id: db.nextTreeId++,
            name: body.name,
            latitude: body.latitude,
            longitude: body.longitude,
            rating: body.rating,
            createdAt: new Date().toISOString()
        }

        db.trees = [newTree, ...db.trees];
        return HttpResponse.json(newTree, {status: 201});
    })
]