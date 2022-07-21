import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { Pane, Dialog, ListItem } from "evergreen-ui";
import Button from "@mui/material/Button";
("use strict");

export default function MapMarkers({ item, setDestination }) {
  const [isShown, setIsShown] = React.useState(false);
  let location = { lat: item.location[0], lng: item.location[1] };
  let icon = {
    url: item.file.url,
    scaledSize: new google.maps.Size(40, 35),
  };

  const handleOpen = (e) => {
    const location = e.latLng;
    setIsShown(true);
    setOrigin(
      new google.maps.LatLng(
        currentUserLocationOnLogin[0],
        currentUserLocationOnLogin[1]
      )
    );
    setDestination(location);
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
          isShown={isShown}
          title={item.name}
          onCloseComplete={() => setIsShown(false)}
          confirmLabel="Add to Basket"
        >
          <img src={item.file.url} />
          {item.description}
        </Dialog>
      </Pane>
    </Marker>
  );
}
