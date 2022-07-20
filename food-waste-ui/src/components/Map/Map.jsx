import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Pane, Dialog, Button } from "evergreen-ui";
import "./Map.css";
("use strict");

export default function Map({ currentUser, products }) {
  const [isShown, setIsShown] = React.useState(false);
  const center = { lat: currentUser.location[0], lng: currentUser.location[1] };
  const containerStyle = {
    width: `90%`,
    height: `1000px`,
  };

  const { isLoaded } = useJsApiLoader({
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
          zoom={2}
          center={center}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {products.map((item) => {
            let location = { lat: item.location[0], lng: item.location[1] };
            return (
              <>
                <Dialog
                  isShown={isShown}
                  title="Dialog title"
                  onCloseComplete={() => setIsShown(false)}
                  confirmLabel="Custom Label"
                >
                  Dialog content
                </Dialog>
                <Marker
                  onClick={() => setIsShown(true)}
                  key={item.objectId}
                  position={location}
                ></Marker>
              </>
            );
          })}
        </GoogleMap>
      </div>
    </>
  );
}
