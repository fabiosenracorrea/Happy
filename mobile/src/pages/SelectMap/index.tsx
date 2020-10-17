import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../assets/images/map-marker.png';

import styles from './styles';

interface Position {
  latitude: number;
  longitude: number;
}

const SelectMapPosition: React.FC = () => {
  const [position, setPosition] = useState<Position>({} as Position);
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('CreateOrphanage', { position });
  }

  function handleSelectMapPosition({ nativeEvent }: MapEvent) {
    setPosition(nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -19.9179945,
          longitude: -43.964318,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

export default SelectMapPosition;
