import SpotProfile from "../../components/SpotProfile/SpotProfile.tsx";
import {fetchSpots} from "../../api/spots.ts";
import type {Spot} from "../../types/spot.ts";
import {useState, useEffect} from "react";

export default function SpotProfilePage() {

    const [error, setError] = useState<string | null>(null);
    const [spots, setSpots] = useState<Spot[]>([]);

    useEffect(() => {
        fetchSpots()
            .then(setSpots)
            .catch(err => {
                console.log(err);
                setError(err);
            });
    })

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1 className="text-3xl text-center font-bold mt-3 my-7 text-gray-600">All Spots</h1>
            <ul className="grid grid-cols-[repeat(auto-fit,250px)] gap-6 justify-center">
                {spots.map((spot) => (
                    <SpotProfile key={spot.id} name={spot.name} latitude={spot.latitude} longitude={spot.longitude}
                        rating={spot.rating}/>
                ))}
            </ul>
        </>
    );
}




