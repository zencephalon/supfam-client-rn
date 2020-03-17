import * as React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Colors from '~/constants/Colors';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 40.6749728,
          longitude: -73.9434645,
          latitudeDelta: 0.0292,
          longitudeDelta: 0.0241,
        }}
      >
        <Marker
          coordinate={{ latitude: 40.6749728, longitude: -73.9434645 }}
          title={'Me'}
          pinColor={Colors.OPEN}
        />
        <Marker
          coordinate={{ latitude: 40.6849738, longitude: -73.9534649 }}
          title={'Daria'}
          pinColor={Colors.BUSY}
        />
        <Marker
          coordinate={{ latitude: 40.664972, longitude: -73.9334641 }}
          title={'Stedman'}
          pinColor={Colors.FREE}
        />
        <Marker
          coordinate={{ latitude: 40.6649726, longitude: -73.9534643 }}
          title={'Claire'}
          pinColor={Colors.AWAY}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
