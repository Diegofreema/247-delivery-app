import React, { useEffect } from 'react';
import { Redirect, Stack, router } from 'expo-router';
import { User, useStoreId } from '../../hooks/useAuth';
import { DeleteModal } from '../../components/DeleteAccount';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
type Props = {
  email: string;
  password: string;
};

const profile = JSON.parse(SecureStore.getItem('profile') || '{}');
const LOCATION_TASK_NAME = 'background-location-task';
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: any) => {
  if (error) {
    console.log('🚀 ~ error:', error);

    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('🚀 ~ AppLayout ~ locations:', 'logged latest location');
    const updateCords = async () => {
      await axios.get(
        `https://247delivery.net/api.aspx/api.aspx?api=sharelocation&longitude=${locations?.[0].coords.longitude}&latitude=${locations?.[0].coords.latitude}&statename=Imo&agentid=${profile.id}`
      );
    };
    updateCords();
    // do something with the locations captured in the background
  }
});
const AppLayout = (props: Props) => {
  const { profile, getId, removeId } = useStoreId();

  useEffect(() => {
    const checkIfBlocked = async () => {
      const credentials: Props = JSON.parse(
        SecureStore.getItem('credentials') || '{}'
      );

      if (!credentials) {
        return;
      }

      const formattedPassword = credentials.password
        .replace(/[#?\/\\%&]/g, '')
        .replace(/:/g, '');
      const { data } = await axios.post(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverylogin&emailaddress=${credentials.email}&pasword=${formattedPassword}`
      );

      if (!data?.id) {
        removeId();
        router.replace('/login');
      }
    };

    checkIfBlocked();
  }, []);

  useEffect(() => {
    getId();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');

        return;
      }
      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      console.log('backgroundStatus', backgroundStatus);

      if (backgroundStatus !== 'granted') {
        Alert.alert(
          'Permission to access location was denied',
          'Location permission is required'
        );
      }
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 3000,
      });
    })();
  }, []);

  if (!profile.id) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <DeleteModal />
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="(tabs)/index"
      />
    </>
  );
};

export default AppLayout;
