import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./Map.css";
import { IconButton } from "@mui/material";
import MapMarkers from "../MapMarkers/MapMarkers";
import { Link } from "react-router-dom";
import { reverseGeoCodeAddress } from "../../constants/geoCodesToAddress";

("use strict");

export default function Map({
  products,
  currentUserLocationOnLogin,
  productDetailDestination,
}) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState(
    reverseGeoCodeOriginAddress(currentUserLocationOnLogin)
  );
  const [destination, setDestination] = useState(
    productDetailDestination
      ? reverseGeoCodeDestinationAddress(productDetailDestination)
      : null
  );

  const containerStyle = {
    width: `85%`,
    height: `850px`,
  };

  let { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  isLoaded = isLoaded && currentUserLocationOnLogin != null;

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

  const center = isLoaded
    ? new google.maps.LatLng({
        lat: currentUserLocationOnLogin[0],
        lng: currentUserLocationOnLogin[1],
      })
    : 0;

  function reverseGeoCodeOriginAddress(input) {
    if (!input) return;
    reverseGeoCodeAddress(input)
      .then((addressComponent) => setOrigin(addressComponent))
      .catch((error) => console.error(error));
  }

  function reverseGeoCodeDestinationAddress(input) {
    if (!input) return;
    reverseGeoCodeAddress(input)
      .then((addressComponent) => setDestination(addressComponent))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div
        style={{ position: "relative", overflow: "visible" }}
        className="map-style"
      >
        <div className="map-box">
          <div className="map-directions-clear">
            <div className="map-input">
              <input
                type="text"
                placeholder="My Location"
                onChange={setOrigin}
                defaultValue={origin}
                disabled={true}
              />

              <input
                type="text"
                placeholder="Product Location"
                disabled={true}
                defaultValue={destination}
              />
            </div>
            <Button onClick={clearRoute}>x</Button>
          </div>
          <div className="map-direction-button">
            <Button onClick={calculateRoute}>Calculate Route</Button>
            <IconButton
              aria-label="center-back"
              children={<FaLocationArrow />}
              onClick={() => map.panTo(center)}
            />
          </div>
          {distance && (
            <div className="mapbox-results">
              <div>Distance: {distance}</div>
              <div>Duration: {duration}</div>
            </div>
          )}
        </div>
        {isLoaded && (
          <GoogleMap
            zoom={2}
            center={center}
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <div className="markers">
              <Marker
                title="My Location"
                position={center}
                animation={google.maps.Animation.DROP}
                optimized={true}
              ></Marker>
              {products.map((item) => {
                return (
                  <div key={item.objectId}>
                    <MapMarkers
                      item={item}
                      setDestination={setDestination}
                      setOrigin={setOrigin}
                      currentUserLocationOnLogin={currentUserLocationOnLogin}
                      destination={destination}
                      setDistance={setDistance}
                      origin={origin}
                      reverseGeoCodeDestinationAddress={
                        reverseGeoCodeDestinationAddress
                      }
                      reverseGeoCodeOriginAddress={reverseGeoCodeOriginAddress}
                    />
                    {directions && (
                      <DirectionsRenderer directions={directions} />
                    )}
                  </div>
                );
              })}
            </div>
          </GoogleMap>
        )}
        <Link to="/home">
          <Button>Show List of Products</Button>
        </Link>
      </div>
    </>
  );
}
