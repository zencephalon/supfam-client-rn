import * as React from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Colors from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import ProfileIcon, { ProfileIconFromProfile } from '~/c/ProfileIcon';
import StatusCenter from '~/c/StatusCenter';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';

import useFriends from '~/h/useFriends';
import useProfileMe from '~/h/useProfileMe';

import * as Location from 'expo-location';

const getLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};

export default function MapScreen() {
  const { friends } = useFriends();

  const map = React.useRef(null);

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
      <SfKeyboardAvoidingView>
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
          ref={map}
          onMapReady={() => {}}
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
                title={`${profile?.name}`}
                description={`${profile?.status?.message}`}
                // pinColor={statusColors[profile?.status?.color] || Colors.OPEN}
              >
                <ProfileIcon
                  profileId={profile.id}
                  size={32}
                  opacity={Math.random()}
                />
              </Marker>
            );
          })}
        </MapView>
        {/* <StatusCenter /> */}
      </SfKeyboardAvoidingView>
    )
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height - 100,
    // height: '90%',
  },
});
