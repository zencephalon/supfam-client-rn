import * as React from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Colors from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import ProfileIcon, { ProfileIconFromProfile } from '~/c/ProfileIcon';
import StatusCenter from '~/c/StatusCenter';

import useFriends from '~/h/useFriends';
import useProfileMe from '~/h/useProfileMe';
import useLight from '~/h/useLight';

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
  const { friends } = useFriends();

  const { backgrounds } = useLight();

  const [location, setLocation] = React.useState(null);
  const { profile } = useProfileMe();

  React.useEffect(() => {
    const get = async () => {
      const location = await getLocation();
      console.log(location);
      setLocation(location);

      Location.watchPositionAsync(
        { accuracy: 3, timeInterval: 100 },
        (location) => {
          console.log('updated location', location);
          setLocation(location);
        }
      );
    };
    get();
  }, []);

  return (
    !!location && (
      <KeyboardAvoidingView
        style={{ ...styles.container, backgroundColor: backgrounds[0] }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={20}
      >
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            // latitude: 40.6749728,
            // longitude: -73.9434645,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0292,
            longitudeDelta: 0.0241,
          }}
        >
          <Marker coordinate={location.coords} title={'Me'}>
            <ProfileIconFromProfile profile={profile} size={32} />
          </Marker>
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
        <StatusCenter />
      </KeyboardAvoidingView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height - 100,
    // height: '90%',
  },
});
