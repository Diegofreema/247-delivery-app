import { Alert, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { Skeleton } from '@rneui/themed';
import { LinearComponent } from '../../components/LinearComponent';
import { Back } from '../../components/Back';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
type Props = {};
const apiKey = process.env.EXPO_PUBLIC_API_KEY || '';
const MapScreen = (props: Props) => {
  const { communityName } = useLocalSearchParams();

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
    return (
      <Animated.View
        entering={SlideInLeft}
        exiting={SlideOutLeft}
        style={{ flex: 1 }}
      >
        <Skeleton
          animation="pulse"
          LinearGradientComponent={LinearComponent}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    );
  }
  const origin = {
    latitude: location?.coords?.latitude as number,
    longitude: location?.coords?.longitude as number,
  };

  const destination = {
    latitude: 5.310866,
    longitude: 7.125232,
  };

  const calculateBearing = (start: typeof origin, end: typeof destination) => {
    const lat1 = start.latitude;
    const lon1 = start.longitude;
    const lat2 = end.latitude;
    const lon2 = end.longitude;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    const bearing = Math.atan2(y, x);
    const degrees = (bearing * (180 / Math.PI) + 360) % 360;

    // Adjust the degrees to ensure the image is not upside down
    const adjustedDegrees = degrees > 180 ? degrees - 360 : degrees;

    return adjustedDegrees;
  };

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={{
        flex: 1,

        backgroundColor: 'white',
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
            source={require('../../assets/images/truck.png')}
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

        <Marker
          coordinate={{
            latitude: 5.310866,
            longitude: 7.125232,
          }}
          title="Your destination"
        />
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
