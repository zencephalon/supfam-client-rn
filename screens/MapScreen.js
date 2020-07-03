import * as React from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import ProfileIcon, { ProfileIconFromProfile } from '~/c/ProfileIcon';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfButton from '~/c/SfButton';
import MapTopBar from '~/c/MapTopBar';

import useFriends from '~/h/useFriends';
import useProfileMe from '~/h/useProfileMe';
import useLocationPermission from '~/h/useLocationPermission';

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
  const { allowed, requestPermission } = useLocationPermission();

  return (
    <SfKeyboardAvoidingView>
      <MapTopBar title="Map" />
      {allowed ? (
        <MapDisplay />
      ) : (
        <PermissionPrompt requestPermission={requestPermission} />
      )}
    </SfKeyboardAvoidingView>
  );
}

function PermissionPrompt({ requestPermission }) {
  return (
    <SfButton
      title="Enable Locations to find your fam"
      onPress={requestPermission}
      style={{ marginTop: 48 }}
    />
  );
}

function MapDisplay() {
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
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          // TODO: figure out what to do with these
          latitudeDelta: 0.0292,
          longitudeDelta: 0.0241,
        }}
        ref={map}
        onMapReady={() => {}}
      >
        <Marker coordinate={location.coords} title={'Me'}>
          <ProfileIconFromProfile profile={profile} size={32} />
        </Marker>
        {friends
          .filter((profile) => profile.location)
          .map((profile) => {
            return (
              <Marker
                key={profile.id}
                coordinate={{
                  latitude: profile?.location?.latitude,
                  longitude: profile?.location?.longitude,
                }}
                title={`${profile?.name}`}
                description={`${profile?.status?.message}`}
                // pinColor={statusColors[profile?.status?.color] || Colors.OPEN}
              >
                <ProfileIcon
                  profileId={profile.id}
                  size={32}
                  // TODO: make this a function of when they last updated their location
                  opacity={1}
                />
              </Marker>
            );
          })}
      </MapView>
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
