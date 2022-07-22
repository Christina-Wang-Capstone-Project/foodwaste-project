import * as React from "react";
import { Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Pane, Dialog } from "evergreen-ui";
import "./MapMarkers.css";

("use strict");

export default function MapMarkers({
  item,
  setDestination,
  setOrigin,
  currentUserLocationOnLogin,
  reverseGeoCodeDestinationAddress,
  reverseGeoCodeOriginAddress,
}) {
  const [isShown, setIsShown] = useState(false);
  let location = { lat: item.location[0], lng: item.location[1] };
  let icon = {
    url: item.file.url,
    scaledSize: new google.maps.Size(40, 35),
  };

  // function reverseGeoCodeOriginAddress(input) {
  //   Geocoder.init(import.meta.env.VITE_GOOGLE_API_KEY, { language: "en" });
  //   Geocoder.from(input)
  //     .then((res) => {
  //       var addressComponent = res.results[0].formatted_address;
  //       setOrigin(addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // }

  // function reverseGeoCodeDestinationAddress(input) {
  //   Geocoder.init(import.meta.env.VITE_GOOGLE_API_KEY, { language: "en" });
  //   Geocoder.from(input)
  //     .then((res) => {
  //       var addressComponent = res.results[0].formatted_address;
  //       setDestination(addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // }

  const handleOpen = (e) => {
    const location = e.latLng;
    setIsShown(true);
    reverseGeoCodeOriginAddress(currentUserLocationOnLogin);
    reverseGeoCodeDestinationAddress([location.lat(), location.lng()]);
  };

  return (
    <Marker
      title={item.title}
      key={item.objectId}
      position={location}
      onClick={handleOpen}
      animation={google.maps.Animation.DROP}
      icon={icon}
      optimized={true}
    >
      <Pane>
        <Dialog
          className="modal-container"
          isShown={isShown}
          title={item.name}
          onCloseComplete={() => setIsShown(false)}
          confirmLabel="Add to Basket"
        >
          <div className="modal-text-container">
            <img className="pop-up-image" src={item.file.url} />
            <div className="modal-text">
              <p>Description: {item.description}</p>
              <p> Quantity: {item.quantity}</p>
            </div>
          </div>
        </Dialog>
      </Pane>
    </Marker>
  );
}
