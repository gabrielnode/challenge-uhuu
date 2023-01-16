import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { usePosition } from "use-position";
import Geocode from "react-geocode";
import { IUser, useUserStore } from "../provider";
interface Places {
  id: number;
  lat: number;
  lng: number;
}
import { shallow } from "zustand/shallow";
import uuid from "react-uuid";

export function Maps({ defaultMapConfig, pointsMarker }: any) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: -3.0758917,
    lng: -59.9912634,
  });
  const [currentZoom, setCurrentZoom] = useState(2);
  const { latitude, longitude, error } = usePosition(true);
  const [places, setPlaces] = useState<Places[]>([]);
  const [setUser] = useUserStore((state) => [state.setUser], shallow);

  useEffect(() => {
    if (latitude && longitude && !error) {
      setCurrentPosition({ lat: latitude, lng: longitude });
      setCurrentZoom(20);
    }
  }, [latitude, longitude, error]);

  function addMarker(e: google.maps.MapMouseEvent) {
    const lat = String(e.latLng?.lat());
    const lng = String(e.latLng?.lng());
    const newPlace = {
      id: places.length,
      lat: Number(lat),
      lng: Number(lng),
    };
    Geocode.fromLatLng(String(lat), String(lng)).then(
      (response: any) => {
        const address = response.results[0].formatted_address;

        setUser({ address, lat, lng });
      },
      (error: any) => {
        console.error({ error });
      }
    );
    setCurrentPosition({ lat: Number(lat), lng: Number(lng) });
    setPlaces((oldData) => [...oldData, newPlace]);
  }
  Geocode.setApiKey("AIzaSyAw0-h-SLwWcG_RnWe1hI7JekbiZqcJprw");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-javascript",
    googleMapsApiKey: "AIzaSyAw0-h-SLwWcG_RnWe1hI7JekbiZqcJprw",
  });
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          {...defaultMapConfig}
          defaultCenter={{ lat: 0, lng: 0 }}
          center={currentPosition}
          zoom={13}
          onClick={(e) => addMarker(e)}
        >
          {pointsMarker.map((place: any) => {
            return (
              <Marker
                key={place.latitude + uuid()}
                position={{
                  lat: Number(place.latitude),
                  lng: Number(place.longitude),
                }}
              />
            );
          })}
          <Marker key={places[0]?.id} position={currentPosition} />
        </GoogleMap>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Maps;
