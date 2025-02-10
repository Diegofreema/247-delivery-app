import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useStoreId } from '../../hooks/useAuth';



const AuthLayout = () => {
  const { profile, getId } = useStoreId();

  useEffect(() => {
    getId();
  }, [getId]);

  if (profile.id) {
    // @ts-ignore
    return <Redirect href={'/'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
