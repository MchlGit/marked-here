import TreeProfile from "../../components/TreeProfile/TreeProfile.tsx";
import {fetchTrees} from "../../api/trees.ts";
import type {Tree} from "../../types/tree.ts";
import {useState, useEffect} from "react";

export default function TreeProfilePage() {

    const [error, setError] = useState<string | null>(null);
    const [trees, setTrees] = useState<Tree[]>([]);

    useEffect(() => {
        fetchTrees()
            .then(setTrees)
            .catch(err => {
                console.log(err);
                setError(err);
            });
    })

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1 className="text-3xl text-center font-bold mt-3 text-gray-600">All Trees</h1>
            <ul className="grid grid-cols-4 gap-6">
                {trees.map((tree) => (
                    <TreeProfile key={tree.id} name={tree.name} latitude={tree.latitude} longitude={tree.longitude}
                        rating={tree.rating}/>
                ))}
            </ul>
        </>
    );
}




