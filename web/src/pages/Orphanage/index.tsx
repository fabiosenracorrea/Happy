import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';

import SideBar from '../../components/SideBar';

import api from '../../services/api';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';

const happyMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface OrphanageData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: string;
  images: { url: string }[];
}

interface RouteParams {
  id: string;
}

const Orphanage: React.FC = () => {
  const [orphanage, setOrphanage] = useState<OrphanageData>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    api.get(`/orphanages/${id}`).then(({ data }) => setOrphanage(data));
  }, [id]);

  const handleImgChange = useCallback(index => {
    setActiveImageIndex(index);
  }, []);

  if (!orphanage) {
    return (
      <div className="loader-container">
        <div className="loader" />
        Carregando...
      </div>
    );
  }

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          {orphanage.images.length > 1 && (
            <div className="images">
              {orphanage.images.map((image, index) => (
                <button
                  key={image.url}
                  className={index === activeImageIndex ? 'active' : ''}
                  type="button"
                  onClick={() => handleImgChange(index)}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              ))}
            </div>
          )}

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="not-open-on-weekends">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  no fim de semana
                </div>
              )}
            </div>

            <a
              className="contact-button"
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=${orphanage.whatsapp}&text=Olá! Gostaria de saber mais informações sobre o Orfanato 😁`}
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
