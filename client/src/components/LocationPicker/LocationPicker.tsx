import {useMemo, useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, useMap, useMapEvents} from "react-leaflet";

const [defaultLat, defaultLng] = [47.6062, -122.3321]; // Seattle
//const [defaultLat, defaultLng] = [47.4571944, -122.180500]; // Seattle


type LatLng = {latitude: number, longitude: number};
type Props = {
    value?: LatLng;
    onChange: (nextPosition: LatLng) => void;
    heightPx?: number;
}

function ClickToSetMarker({onChange}: {onChange: (position: LatLng) => void}) {
    useMapEvents({
        click(event) {
            onChange({latitude: event.latlng.lat, longitude: event.latlng.lng});
        }
    });
    return null;
}

function RecenterMap({latitude, longitude}: { latitude: number; longitude: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([latitude, longitude], map.getZoom(), {animate: true});
    }, [latitude, longitude, map]);
    return null;
}

export default function LocationPicker({value, onChange, heightPx = 320}: Props) {
    const defaultCenter = useMemo(() => ({latitude: defaultLat, longitude: defaultLng}), []);
    const position = value ?? defaultCenter;

    const [geoError, setGeoError] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [shouldRecenter, setShouldRecenter] = useState(false);

    function useMyLocation() {
        setGeoError(null);
        setIsLocating(true);
        setShouldRecenter(false);

        if(!navigator.geolocation) {
            setIsLocating(false);
            setGeoError("Geolocation is not supported in this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLocating(false);
                setShouldRecenter(true);
                onChange({latitude: position.coords.latitude, longitude: position.coords.longitude});
            },
            (error) => {
                setIsLocating(false);
                setGeoError(`Error: ${error}` || "Error: Could not load location.");
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            }
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={useMyLocation}
                    disabled={isLocating}
                    className="rounded-md px-3 py-2 text-sm text-white font-semibold bg-accent-500 hover:bg-accent-600 disabled:opacity-50"
                >
                    {isLocating ? "Locating..." : "Use my location"}
                </button>
                <div className="text-sm text-slate-600">
                    Click the map to drop a pin.
                </div>
            </div>

            {geoError && <div>{geoError}</div>}

            <div style={{height: heightPx}} className="overflow-hidden rounded-lg border">
                <MapContainer
                    center={[position.latitude, position.longitude]}
                    zoom={16}
                    scrollWheelZoom
                    style={{height:"100%", width:"100%"}}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ClickToSetMarker onChange={onChange} />
                    <Marker position={[position.latitude, position.longitude]} />
                    {shouldRecenter && <RecenterMap latitude={position.latitude} longitude={position.longitude} />}
                </MapContainer>
            </div>

            <div className="text-xs text-slate-600">
                Lat: {position.latitude.toFixed(6)} • Lng: {position.longitude.toFixed(6)}
            </div>

        </div>
    )
}