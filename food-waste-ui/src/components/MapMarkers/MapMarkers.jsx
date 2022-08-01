import * as React from "react";
import { Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Pane, Dialog } from "evergreen-ui";
import "./MapMarkers.css";
import { useNavigate } from "react-router-dom";

("use strict");

export default function MapMarkers({
  item,
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
  const navigate = useNavigate();

  const handleOpen = (e) => {
    const location = e.latLng;
    setIsShown(true);
    reverseGeoCodeOriginAddress(currentUserLocationOnLogin);
    reverseGeoCodeDestinationAddress([location.lat(), location.lng()]);
  };
  const navigateToMarketDetail = (productId) => {
    navigate(`../${productId}`, { replace: true });
    setIsShown(false);
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
          confirmLabel="Learn More"
          onConfirm={() => navigateToMarketDetail(item.objectId)}
        >
          <div className="modal-text-container">
            <img className="pop-up-image" src={item.file.url} />
            <div className="modal-text">
              <p>Description: {item.description.substring(0, 20)}...</p>
              <p> Available: {item.quantity}</p>
            </div>
          </div>
        </Dialog>
      </Pane>
    </Marker>
  );
}
