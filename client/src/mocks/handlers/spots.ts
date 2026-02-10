import {http, HttpResponse} from "msw";
import {db} from "../db";
import type {Spot} from "../../types/spot";

export const spotsHandlers = [
    // GET /api/spots
    http.get("/api/spots", () => {
        return HttpResponse.json(db.spots);
    }),

    // POST /api/spots
    http.post("/api/spots", async ({request}) => {
        const body = (await request.json()) as Partial<Spot>;

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

        const newSpot: Spot = {
            id: db.nextSpotId++,
            name: body.name,
            latitude: body.latitude,
            longitude: body.longitude,
            neighborhood: body.neighborhood ?? "",
            city: body.city ?? "",
            region: body.region ?? "",
            country: body.country ?? "",
            locationLabel: body.locationLabel ?? "",
            rating: body.rating,
            createdAt: new Date().toISOString()
        }

        db.spots = [newSpot, ...db.spots];
        return HttpResponse.json(newSpot, {status: 201});
    })
]