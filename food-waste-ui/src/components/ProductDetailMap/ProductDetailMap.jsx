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

export default function()