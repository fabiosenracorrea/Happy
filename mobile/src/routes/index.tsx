import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapViewPage from '../pages/MapView';
import OrphanageDetail from '../pages/OrphanageDetail';
import SelectMap from '../pages/SelectMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Header from '../components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f2f3f5' },
        }}
      >
        <Screen name="MapViewPage" component={MapViewPage} />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetail}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />
        <Screen
          name="SelectMap"
          component={SelectMap}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione o Local" />,
          }}
        />
        <Screen
          name="CreateOrphanage"
          component={CreateOrphanage}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os Dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
