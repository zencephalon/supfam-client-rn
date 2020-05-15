import * as React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Colors from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import ProfileIcon from '~/c/ProfileIcon';

import useFriends from '~/h/useFriends';

import * as Location from 'expo-location';

const getLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};

export default function LinksScreen() {
  const { status, friends, error } = useFriends();

  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    const get = async () => {
      const location = await getLocation();
      setLocation(location);
    };
    get();
  }, []);

  return (
    !!location && (
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
          {friends.map((profile) => {
            return (
              <Marker
                key={profile.id}
                coordinate={{
                  latitude: 40.6749728 + Math.random() * 0.01,
                  longitude: -73.9434645 + Math.random() * 0.01,
                }}
                title={profile?.name || 'Friend'}
                pinColor={statusColors[profile?.status?.color] || Colors.OPEN}
              >
                <ProfileIcon profileId={profile.id} size={32} />
              </Marker>
            );
          })}
        </MapView>
      </View>
    )
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
