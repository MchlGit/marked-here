import {useMemo, useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, useMap, useMapEvents} from "react-leaflet";
import type {Location} from "../../api/reverseGeocodeMapbox";
import {reverseGeocodeCityMapbox} from "../../api/reverseGeocodeMapbox";

const [defaultLat, defaultLng] = [47.6062, -122.3321]; // Seattle

type Props = {
    value?: Location;
    onChange: (nextLocation: Location) => void;
    heightPx?: number;
}

function ClickToSetMarker({onChange}: {onChange: (location: Location) => void}) {
    useMapEvents({
        async click(event) {
            const {lat, lng} = event.latlng;
            const location = await reverseGeocodeCityMapbox(lat, lng);
            onChange(location);
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
    const defaultCenter = useMemo(() => (
        {
            lat: defaultLat,
            lng: defaultLng,
            neighborhood: "Downtown", // hardcode values for now
            city: "Seattle",
            region: "Washington",
            country: "United States",
            label: "Somewhere in Downtown"
        }), []);
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
            async (position) => {
                setIsLocating(false);
                setShouldRecenter(true);
                const location = await reverseGeocodeCityMapbox(position.coords.latitude, position.coords.longitude)
                onChange(location);
            },
            (error) => {
                setIsLocating(false);
                setGeoError(error.code === error.PERMISSION_DENIED ? "Location Access must be enabled for browser." : "Location cannot be retrieved.");
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
                    center={[position.lat, position.lng]}
                    zoom={16}
                    scrollWheelZoom
                    style={{height:"100%", width:"100%"}}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ClickToSetMarker onChange={onChange} />
                    <Marker position={[position.lat, position.lng]} />
                    {shouldRecenter && <RecenterMap latitude={position.lat} longitude={position.lng} />}
                </MapContainer>
            </div>

            <div className="text-xs text-slate-600">
                Lat: {position.lat.toFixed(6)} • Lng: {position.lng.toFixed(6)} • Neighborhood:{position.neighborhood} • City:{position.city} • Region:{position.region} • Country:{position.country} Place: {position.label},
            </div>

        </div>
    )
}