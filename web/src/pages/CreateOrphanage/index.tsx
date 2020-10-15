import React, { FormEvent, useCallback, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet, { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';

import api from '../../services/api';

import SideBar from '../../components/SideBar';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';

const happyMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface Position {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState<Position>({} as Position);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');

  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const history = useHistory();

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { latitude, longitude } = position;

      if (!latitude) {
        alert('Marque o local no mapa!');
      }

      const data = new FormData();

      data.append('name', name);
      data.append('about', about);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('opening_hours', opening_hours);
      data.append('instructions', instructions);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));

      images.forEach(image => {
        data.append('images', image);
      });

      await api.post('orphanages', data);

      alert('Cadastro realizado com sucesso!');

      history.push('/app');
    },
    [
      history,
      name,
      about,
      opening_hours,
      open_on_weekends,
      position,
      instructions,
      images,
    ],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);

      setImages(selectedImages);

      const selectedImgsURLs = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setImagesURLs(selectedImgsURLs);
    },
    [],
  );

  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.930986, -43.940184]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position?.latitude && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={({ target }) => setAbout(target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="image-container">
                {imagesURLs.map(image => (
                  <img
                    key={image}
                    src={image}
                    alt={name}
                    className="new-image"
                  />
                ))}

                <label htmlFor="images" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="images"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={({ target }) => setInstructions(target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={({ target }) => setOpeningHours(target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
export default CreateOrphanage;
