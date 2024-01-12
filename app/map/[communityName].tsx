import { Alert, StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image } from 'expo-image';

import { Back } from '../../components/Back';

import { MapSkeleton } from '../../components/MapSkeleton';
type Props = {};
const apiKey = process.env.EXPO_PUBLIC_API_KEY || '';
const MapScreen = (props: Props) => {
  const { communityName } = useLocalSearchParams<{ communityName: string }>();
  const mapContainerAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(mapContainerAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(mapContainerAnim, {
        toValue: 1000,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  }, []);
  console.log('communityName', communityName);
  const lat = Number(communityName?.split('-')[0]);
  const lng = Number(communityName?.split('-')[1]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');

        return;
      }
      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        Alert.alert(
          'Permission to access location was denied',
          'Location permission is required'
        );
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    })();
  }, []);
  useEffect(() => {
    // Request location updates and start watching for position changes
    const startLocationUpdates = async () => {
      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 200000 },
        (location) => {
          setLocation(location);
        }
      );
    };

    startLocationUpdates();
  }, []);

  if (!location) {
    return <MapSkeleton />;
  }
  const origin = {
    latitude: location?.coords?.latitude as number,
    longitude: location?.coords?.longitude as number,
  };

  const destination = {
    latitude: lat,
    longitude: lng,
  };

  const calculateBearing = (start: typeof origin, end: typeof destination) => {
    const { latitude: lat1, longitude: lon1 } = start;
    const { latitude: lat2, longitude: lon2 } = end;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = Math.atan2(y, x);
    if (bearing < 0) {
      bearing += 2 * Math.PI; // convert to positive angle
    }

    const degrees = (bearing * (120 / Math.PI) + 360) % 360;
    const adjustedDegrees = (degrees + 180) % 360; // add 180 degrees

    return adjustedDegrees;
  };

  return (
    <Animated.View
      style={{
        flex: 1,

        backgroundColor: 'white',
        transform: [{ translateX: mapContainerAnim }],
      }}
    >
      <Back />
      <MapView
        ref={mapRef}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        <Marker
          rotation={calculateBearing(origin, destination)}
          coordinate={origin}
          title="Your current location"
        >
          <Image
            source={require('../../assets/images/truckk.png')}
            style={styles.img}
          />
        </Marker>

        <MapViewDirections
          mode="DRIVING"
          origin={origin}
          destination={destination}
          apikey={apiKey}
          precision="high"
          strokeColor="blue"
          strokeWidth={3}
          timePrecision="now"
        />

        <Marker coordinate={destination} title="Your destination" />
      </MapView>
    </Animated.View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: 50,
    height: 50,
  },
});
