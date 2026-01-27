import {createTree} from "../../api/trees.ts";
import type {CreateTreeInput} from "@/types";
import type {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateTreePage() {
    const navigate = useNavigate();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const input: CreateTreeInput = {
            name: formData.get("tree-name") as string,
            latitude: Number(formData.get("tree-latitude")),
            longitude: Number(formData.get("tree-longitude")),
            rating: Number(formData.get("tree-rating"))
        }

        // client side validation
        if (!input.name || !input.latitude || !input.longitude || !input.rating) {
            alert("All fields are required");
            return;
        }

        try{
            await createTree(input);
            navigate("/");
        }
        catch (error) {
            alert(error);
        }
    }

    return (<div className="mx-auto max-w-md px-4 py-8">
        <h1 className="mb-6 text-xl font-semibold text-slate-700">Create a Tree</h1>
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label
                    htmlFor="tree-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name
                </label>
                <input
                    id="tree-name"
                    name="tree-name"
                    type="text"
                    required
                    className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                    placeholder="e.g. Japanese Maple"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="tree-latitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Latitude
                    </label>
                    <input
                        id="tree-latitude"
                        name="tree-latitude"
                        type="number"
                        step="any"
                        required
                        className="mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-accent-600"
                        placeholder="47.6062"
                    />
                </div>
                <div>
                    <label
                        htmlFor="tree-longitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Longitude
                    </label>
                    <input
                        id="tree-longitude"
                        name="tree-longitude"
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
                    htmlFor="tree-rating"
                    className="block text-sm font-medium text-gray-700"
                >
                    Rating
                </label>
                <input
                    name="tree-rating"
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
                Submit a Tree!
            </button>
        </form>
    </div>);
}