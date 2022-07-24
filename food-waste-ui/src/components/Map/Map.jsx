import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./Map.css";
import { IconButton } from "@mui/material";
import MapMarkers from "../MapMarkers/MapMarkers";
import { Link } from "react-router-dom";
import Geocoder from "react-native-geocoding";

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

  if (!isLoaded) {
    return <Skeleton />;
  }

  const center = isLoaded
    ? new google.maps.LatLng({
        lat: currentUserLocationOnLogin[0],
        lng: currentUserLocationOnLogin[1],
      })
    : 0;

  function reverseGeoCodeOriginAddress(input) {
    Geocoder.init(import.meta.env.VITE_GOOGLE_API_KEY, { language: "en" });
    Geocoder.from(input)
      .then((res) => {
        var addressComponent = res.results[0].formatted_address;
        setOrigin(addressComponent);
      })
      .catch((error) => console.warn(error));
  }

  function reverseGeoCodeDestinationAddress(input) {
    Geocoder.init(import.meta.env.VITE_GOOGLE_API_KEY, { language: "en" });
    Geocoder.from(input)
      .then((res) => {
        var addressComponent = res.results[0].formatted_address;
        setDestination(addressComponent);
      })
      .catch((error) => console.warn(error));
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
              <h1>Distance: {distance}</h1>
              <h1>Duration: {duration}</h1>
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
                  <>
                    <MapMarkers
                      item={item}
                      key={item.objectId}
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
                  </>
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
