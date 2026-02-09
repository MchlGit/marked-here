import type {FormEvent} from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {CreateSpotInput} from "@/types";
import {createSpot} from "@api/spots.ts";
import LocationPicker from "@components/LocationPicker/LocationPicker.tsx";
import type {Location} from "@/types/location.ts";

export default function CreateSpotPage() {
    const navigate = useNavigate();
    const [location, setLocation] = useState<Location | undefined>(undefined);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if(!location) {
            alert("Please choose a location on the map or use your location.");
            return;
        }

        const input: CreateSpotInput = {
            name: formData.get("spot-name") as string,
            latitude: location.lat,
            longitude: location.lng,
            city: location.city ?? "",
            country: location.country ?? "",
            region: location.region ?? "",
            neighborhood: location.neighborhood ?? "",
            locationLabel: location.locationLabel ?? "",
            rating: Number(formData.get("spot-rating"))
        }

        // client side validation
        if (!input.name || !input.latitude || !input.longitude || !input.rating) {
            console.log(JSON.stringify(input));
            alert("All fields are required");
            return;
        }

        try{
            await createSpot(input);
            navigate("/");
        }
        catch (error) {
            alert(error);
        }
    }

    return (<div className="mx-auto px-4 py-8">
        <h1 className="mb-6 text-xl font-semibold text-slate-700">Create a Spot</h1>
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label
                    htmlFor="spot-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name
                </label>
                <input
                    id="spot-name"
                    name="spot-name"
                    type="text"
                    required
                    className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                    placeholder="e.g. Japanese Maple"
                />
            </div>
            <LocationPicker value={location} onChange={setLocation} />
            <div>
                <label
                    htmlFor="spot-rating"
                    className="block text-sm font-medium text-gray-700"
                >
                    Rating
                </label>
                <input
                    id="spot-rating"
                    name="spot-rating"
                    type="number"
                    min="0"
                    max="5"
                    required
                    className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                    placeholder="5"
                />
            </div>
            <button
                type="submit"
                className= "inline-flex w-full items-center justify-center rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600"
            >
                Submit a Spot!
            </button>
        </form>
    </div>);
}