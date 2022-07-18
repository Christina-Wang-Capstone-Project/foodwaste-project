import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Map.css";

export default function Map({ currentUser }) {
  const center = { lat: 0, lng: 0 };
  const containerStyle = {
    width: `1000px`,
    height: `500px`,
  };

  const { isLoaded } = useLoadScript({
    id: "script-loader",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return !isLoaded ? (
    <Skeleton />
  ) : (
    <>
      <div
        style={{ position: "relative", overflow: "visible" }}
        className="map-style"
      >
        <GoogleMap
          center={center}
          zoom={5}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </div>
    </>
  );
}
