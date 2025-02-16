import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

  function Map({ latitude = -6.171639573603923 , longitude = 106.64571671733432  }) {
    const [path, setPath] = useState([]);
  
    // Combine latitude and longitude into a position array
    const position = [latitude, longitude];
  
    useEffect(() => {
      if (latitude && longitude) {
        setPath((prevPath) => [...prevPath, position]);
      }
    }, [latitude, longitude]);
  
    return (
      <div>
        <MapContainer center={position} zoom={15} style={{ height: '580px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>UAV Location</Popup>
          </Marker>
          <Polyline positions={path} color="blue" />
        </MapContainer>
      </div>
    );
  }
  
  export default Map;