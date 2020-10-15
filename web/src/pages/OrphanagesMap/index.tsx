import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import api from '../../services/api';

import mapMarker from '../../images/map-marker.svg';

import { Container, SideBar, MapContainer } from './styles';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [48, 68],
  iconAnchor: [24, 68],
  popupAnchor: [165, 4],
});

interface OrphanageData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageData[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(({ data }) => setOrphanages(data));
  }, []);

  return (
    <Container>
      <SideBar>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Belo Horizonte</strong>
          <span>Minas Gerais</span>
        </footer>
      </SideBar>

      <MapContainer>
        <Map
          center={[-19.9659916, -43.9722723]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          {orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} />
                </Link>
              </Popup>
            </Marker>
          ))}
        </Map>
      </MapContainer>

      <Link to="/register">
        <FiPlus size={24} />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
