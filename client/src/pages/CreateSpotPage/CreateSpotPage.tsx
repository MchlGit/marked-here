import {createSpot} from "../../api/spots.ts";
import type {CreateSpotInput} from "@/types";
import type {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateSpotPage() {
    const navigate = useNavigate();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const input: CreateSpotInput = {
            name: formData.get("spot-name") as string,
            latitude: Number(formData.get("spot-latitude")),
            longitude: Number(formData.get("spot-longitude")),
            rating: Number(formData.get("spot-rating"))
        }

        // client side validation
        if (!input.name || !input.latitude || !input.longitude || !input.rating) {
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

    return (<div className="mx-auto max-w-md px-4 py-8">
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="spot-latitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Latitude
                    </label>
                    <input
                        id="spot-latitude"
                        name="spot-latitude"
                        type="number"
                        step="any"
                        required
                        className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                        placeholder="47.6062"
                    />
                </div>
                <div>
                    <label
                        htmlFor="spot-longitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Longitude
                    </label>
                    <input
                        id="spot-longitude"
                        name="spot-longitude"
                        type="number"
                        step="any"
                        required
                        className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                        placeholder="-122.3321"
                    />
                </div>
            </div>
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