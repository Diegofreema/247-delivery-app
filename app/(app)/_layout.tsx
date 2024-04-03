import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useStoreId } from '../../hooks/useAuth';

type Props = {};

const AppLayout = (props: Props) => {
  const { id, getId } = useStoreId();
  console.log('🚀 ~ AppLayout ~ id:', id);

  useEffect(() => {
    getId();
  }, []);

  if (id === null) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="(tabs)/index"
    />
  );
};

export default AppLayout;
