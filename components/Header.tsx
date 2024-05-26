import { Feather } from '@expo/vector-icons';
import { Header, Text } from '@rneui/themed';
import { PropsWithChildren } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import { useStoreId } from '../hooks/useAuth';
import { router, usePathname } from 'expo-router';
import { CustomMenu } from './CustomMenu';

type Props = {
  children: PropsWithChildren<any>;
  placement?: 'left' | 'center' | 'right';
};

export const HeaderComponent = ({
  children,
  placement,
}: Props): JSX.Element => {
  const { removeId } = useStoreId();
  const pathname = usePathname();

  const handleLogout = () => {
    removeId();
    router.replace('/');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>
        {children}
      </Text>
      {pathname !== '/login' && <CustomMenu />}
    </View>
  );
};

const styles = StyleSheet.create({});
