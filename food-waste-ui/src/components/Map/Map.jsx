import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Pane, Dialog, ListItem } from "evergreen-ui";
import { FaLocationArrow } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Map.css";
("use strict");

export default function Map({
  currentUser,
  products,
  getLocation,
  coordinates,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    map.setZoom(11);
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
        <div className="map-box">
          <input type="text" placeholder="Origin" />
          <input type="text" placeholder="Product Location" />
        </div>
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
                <Marker
                  onClick={handleOpen}
                  key={item.objectId}
                  position={location}
                ></Marker>
                <Modal open={open} onClose={handleClose}>
                  <Box className="modal-container">
                    <Typography className="modal-modal-title">
                      {item.name}
                    </Typography>
                    <Typography className="modal-modal-description">
                      {item.description}
                    </Typography>
                  </Box>
                </Modal>
              </>
            );
          })}
        </GoogleMap>
      </div>
    </>
  );
}
