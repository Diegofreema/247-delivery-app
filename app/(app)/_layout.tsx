import React, { useEffect } from 'react';
import { Redirect, Stack, router } from 'expo-router';
import { useStoreId } from '../../hooks/useAuth';
import { DeleteModal } from '../../components/DeleteAccount';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
type Props = {
  email: string;
  password: string;
};

const AppLayout = () => {
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
        `https://test.omega12x.net/api.aspx?api=deliverylogin&emailaddress=${credentials.email}&pasword=${formattedPassword}`
      );

      if (!data?.id) {
        removeId();
        router.replace('/login');
      }
    };

    checkIfBlocked();
  }, [removeId]);

  useEffect(() => {
    getId();
  }, [getId]);

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
