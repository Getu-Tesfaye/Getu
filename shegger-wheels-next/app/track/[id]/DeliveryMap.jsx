
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const courierIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitMarkers({ courier, delivery }) {
  const map = useMap();

  map.fitBounds([courier, delivery], { padding: [40, 40] });

  return null;
}

export default function DeliveryMap({
  courier = [9.03, 38.74],
  delivery = [9.02, 38.75],
  deliveryAddress = "Addis Ababa, Ethiopia",
}) {
  return (
    <div style={{ width: "100%", height: 380 }}>
      <MapContainer
        center={courier}
        zoom={13}
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={courier} icon={courierIcon}>
          <Popup>Courier location</Popup>
        </Marker>

        <Marker position={delivery} icon={courierIcon}>
          <Popup>Delivery address: {deliveryAddress}</Popup>
        </Marker>

        <FitMarkers courier={courier} delivery={delivery} />
      </MapContainer>
    </div>
  );
}
