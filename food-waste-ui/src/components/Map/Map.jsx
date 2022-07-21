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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Map.css";
import { IconButton } from "@mui/material";

("use strict");

export default function Map({
  currentUser,
  products,
  getLocation,
  coordinates,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    await setOrigin(
      new google.maps.LatLng(currentUser.location[0], currentUser.location[1])
    );
    await setDestination(
      new google.maps.LatLng(
        curProduct.current.props.position.lat,
        curProduct.current.props.position.lng
      )
    );
  };
  const handleClose = () => setOpen(false);
  const center = { lat: currentUser.location[0], lng: currentUser.location[1] };

  const containerStyle = {
    width: `90%`,
    height: `800px`,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  let curProduct = useRef();

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
    console.log("destination in service", destination);
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
    setOrigin(currentUser.location);
    setDestination([]);
  };

  if (!isLoaded) {
    return <h1>Is Loading...</h1>;
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
            placeholder="Origin"
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
              let location = { lat: item.location[0], lng: item.location[1] };
              return (
                <>
                  <Marker
                    onClick={handleOpen}
                    key={item.objectId}
                    position={location}
                    ref={curProduct}
                  ></Marker>
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
