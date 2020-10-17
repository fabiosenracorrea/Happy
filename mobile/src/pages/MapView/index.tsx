import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import mapMarker from '../../assets/images/map-marker.png';

import styles from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const MapViewPage: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages').then(({ data }) => setOrphanages(data));
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToOrphanageCreation() {
    navigation.navigate('SelectMap');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -19.930774,
          longitude: -43.939512,
          longitudeDelta: 0.008,
          latitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToOrphanageCreation}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

export default MapViewPage;
