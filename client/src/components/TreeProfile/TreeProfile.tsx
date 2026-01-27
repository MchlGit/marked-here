interface TreeProfileProps {
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
}

export default function TreeProfile(props: TreeProfileProps) {
    return (
        <div className="flex flex-col my-7 items-center bg-white p-7 rounded-lg">
            <img
                src="/wishing-tree-seattle.jpeg"
                alt="Capitol Hill Wishing Tree"
                className="w-50"
            />
            <span className="text-lg text-gray-800 font-medium">{props.name}</span>
            <ul className="text-sm">
                <li>{props.latitude},{props.longitude}</li>
                <li>Rating: {props.rating}</li>
            </ul>
        </div>
    );
}
//47.6322467,-122.3073747