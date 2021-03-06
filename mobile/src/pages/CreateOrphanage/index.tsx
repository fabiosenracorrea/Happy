import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';
import api from '../../services/api';

interface CreateParams {
  key: string;
  name: string;
  params: {
    position: {
      latitude: number;
      longitude: number;
    };
  };
}

const CreateOrphanage: React.FC = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [opening_hours, setOpeningHours] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const { params } = useRoute<CreateParams>();
  const navigation = useNavigation();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImages([...images, uri]);
  }

  async function handleOrphanageCreation() {
    const { latitude, longitude } = params.position;

    if (
      !name ||
      !about ||
      !instructions ||
      !opening_hours ||
      !images[0] ||
      !whatsapp
    ) {
      alert('Preencha todos os campos :)');
      return;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    data.append('instructions', instructions);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach((image, index) => {
      data.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `image_${index}.jpg`,
      } as any);
    });

    await api.post('/orphanages', data);

    navigation.navigate('MapViewPage');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
        placeholder="31 (DDD) + 99999999"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(img => (
          <Image key={img} source={{ uri: img }} style={styles.uploadedImage} />
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
        placeholder="Das 8h às 18h"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={() => setOpenOnWeekends(!open_on_weekends)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleOrphanageCreation}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

export default CreateOrphanage;
