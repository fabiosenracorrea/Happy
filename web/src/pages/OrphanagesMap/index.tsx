import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarker from '../../images/map-marker.svg';

import { Container, SideBar, MapContainer } from './styles';

const OrphanagesMap: React.FC = () => {
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
        </Map>
      </MapContainer>

      <Link to="/">
        <FiPlus size={24} />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
