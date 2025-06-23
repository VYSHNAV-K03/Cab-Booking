import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Marker Icon
const cabIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Taxi Icon
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point
  popupAnchor: [0, -40], // Popup position
});

// Component to update map center dynamically
const UpdateMapCenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const CabMap = ({ cabId }) => {
  const [cabLocation, setCabLocation] = useState(null); // Initially null
  const mapRef = useRef(null); // Store map instance

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get_cab_location/${cabId}`);
        setCabLocation({
          lat: response.data.latitude,
          lng: response.data.longitude,
        });
      } catch (error) {
        console.error("Error fetching cab location:", error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, [cabId]);

  if (!cabLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", border: "2px solid #ccc" }}>
      <MapContainer
        center={cabLocation}
        zoom={14}
        style={{ height: "700px", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={cabLocation} icon={cabIcon}>
          <Popup>
            🚖 Cab is here! <br /> Latitude: {cabLocation.lat} <br /> Longitude: {cabLocation.lng}
          </Popup>
        </Marker>
        <UpdateMapCenter lat={cabLocation.lat} lng={cabLocation.lng} />
      </MapContainer>
    </div>
  );
};

export default CabMap;
