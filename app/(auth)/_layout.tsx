import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStoreId } from '../../hooks/useAuth';

type Props = {};

const AuthLayout = (props: Props) => {
  const { id, getId } = useStoreId();

  useEffect(() => {
    getId();
  }, []);

  if (id) {
    // @ts-ignore
    <Redirect href={`/(tabs)/${id}`} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
