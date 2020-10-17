import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  function handleArrowLeftClick() {
    navigation.goBack();
  }

  function handleXclick() {
    navigation.navigate('MapViewPage');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={handleArrowLeftClick}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleXclick}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
