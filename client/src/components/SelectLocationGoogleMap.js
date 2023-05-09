import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const SelectLocationGoogleMap = ({ selectedLocation, setSelectedLocation }) => {
  const onSelect = (e) => {
    setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCW4rvjYHkwy-rFg-F7jadY2XpXswA6-T0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={2}
        onClick={onSelect}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default SelectLocationGoogleMap;
