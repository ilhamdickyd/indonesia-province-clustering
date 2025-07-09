import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ geojsonData, styleGeoJSON }) => {
  return (
    <MapContainer 
      center={[-2.5, 118]} 
      zoom={5} 
      style={{ height: '100%', width: '100%' }} 
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {geojsonData && (
        <GeoJSON 
          data={geojsonData} 
          style={styleGeoJSON} 
          onEachFeature={(feature, layer) => {
            if (feature.properties) {
              layer.bindPopup(`
                <div>
                  <h3 style="font-weight: bold; margin-bottom: 8px;">
                    ${feature.properties.nama_provinsi}
                  </h3>
                  <p>Klaster: ${feature.properties.klaster}</p>
                </div>
              `);
            }
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;