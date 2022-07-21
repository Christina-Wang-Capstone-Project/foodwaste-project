import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Pane, Dialog, ListItem } from "evergreen-ui";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./Map.css";
import { IconButton } from "@mui/material";
import MapMarkers from "../MapMarkers/MapMarkers";

("use strict");

export default function Map({ products, currentUserLocationOnLogin }) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const center = {
    lat: currentUserLocationOnLogin[0],
    lng: currentUserLocationOnLogin[1],
  };

  const containerStyle = {
    width: `90%`,
    height: `800px`,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(11);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const calculateRoute = async () => {
    if (origin == "" || !destination) {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(results);
    setDistance(results.routes[0].legs[0].distance.text); //text returns readable value
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirections(null);
    setDistance("");
    setDuration("");
    setOrigin();
    setDestination([]);
  };

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <>
      <div
        style={{ position: "relative", overflow: "visible" }}
        className="map-style"
      >
        <div className="map-box">
          <input
            type="text"
            placeholder="My Location"
            onChange={setOrigin}
            defaultValue={origin}
          />
          <input
            type="text"
            placeholder="Product Location"
            defaultValue={destination}
          />

          <Button onClick={calculateRoute}>Calculate Route</Button>
          <IconButton
            aria-label="center-back"
            children={<FaLocationArrow />}
            onClick={() => map.panTo(center)}
          />
          <Button onClick={clearRoute}>x</Button>
          <div className="mapbox-results">
            <h1>Distance: {distance}</h1>
            <h1>Duration: {duration}</h1>
          </div>
        </div>
        <GoogleMap
          zoom={2}
          center={center}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <div className="markers">
            {products.map((item) => {
              return (
                <>
                  <MapMarkers item={item} setDestination={setDestination} />
                  {directions && <DirectionsRenderer directions={directions} />}
                </>
              );
            })}
          </div>
        </GoogleMap>
      </div>
    </>
  );
}
