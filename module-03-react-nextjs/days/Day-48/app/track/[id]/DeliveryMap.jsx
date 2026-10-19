"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

const courierIcon = L.divIcon({
  html: '<span style="font-size:28px">🛵</span>',
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const homeIcon = L.divIcon({
  html: '<span style="font-size:28px">🏠</span>',
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function FitBoth({ courier, delivery }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(
      [
        [courier.lat, courier.lng],
        [delivery.lat, delivery.lng],
      ],
      { padding: [40, 40] }
    );
  }, [map, courier.lat, courier.lng, delivery.lat, delivery.lng]);

  return null;
}

export default function DeliveryMap({ courier, delivery }) {
  return (
    <MapContainer
      center={[delivery.lat, delivery.lng]}
      zoom={13}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker
        position={[courier.lat, courier.lng]}
        icon={courierIcon}
        title="Courier"
      />
      <Marker
        position={[delivery.lat, delivery.lng]}
        icon={homeIcon}
        title="Delivery address"
      />
      <FitBoth courier={courier} delivery={delivery} />
    </MapContainer>
  );
}