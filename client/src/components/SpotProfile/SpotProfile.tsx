import placeholder from "@/assets/placeholder.jpg";

interface SpotProfileProps {
    name: string;
    latitude: number;
    longitude: number;
    city?: string;
    region?: string;
    neighborhood?: string;
    locationLabel?: string;
    country?: string;
    rating: number;
}

export default function SpotProfile(props: SpotProfileProps) {
    return (
        <div
            className="flex flex-col bg-white p-4 sm:p-7 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm">
            <div className="aspect-square w-full overflow-hidden">
                <img
                    src={placeholder}
                    alt="Photo Placeholder"
                    className="w-full h-full border object-cover border-gray-200 rounded-lg"
                />
                <a href="http://www.freepik.com" className="text-[9px] mb-2 text-gray-400">Designed by rawpixel.com /
                    Freepik</a>
            </div>
            <div className="p-4 sm:p-5 flex flex-col gap-2">
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 gap-1">
                    {props.name}
                </h3>
                <p className="text-sm text-gray-600">Fairwood</p>
                <p className="text-sm text-gray-500">Renton, Washington</p>
                <div className="flex items-center gap-2 text-sm mt-1">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-gray-900">{props.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}
//47.6322467,-122.3073747