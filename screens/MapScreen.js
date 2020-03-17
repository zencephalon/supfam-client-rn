import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import MapView, { Marker } from 'react-native-maps';
import SfText from '~/components/SfText';
import * as Colors from '~/constants/Colors';

import { RectButton, ScrollView } from 'react-native-gesture-handler';

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
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
