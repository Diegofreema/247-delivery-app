import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStoreId } from '../../hooks/useAuth';

type Props = {};

const AuthLayout = (props: Props) => {
  const { id, getId } = useStoreId();
  console.log('🚀 ~ AuthLayout ~ id:', id);

  useEffect(() => {
    getId();
  }, []);

  if (id) {
    // @ts-ignore
    return <Redirect href={'/'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
