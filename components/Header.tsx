import {Text} from '@rneui/themed';
import {PropsWithChildren} from 'react';

import {usePathname} from 'expo-router';
import {View} from 'react-native';
import {CustomMenu} from './CustomMenu';

type Props = {
  children: PropsWithChildren<any>;
  placement?: 'left' | 'center' | 'right';
};

export const HeaderComponent = ({
  children,

}: Props): JSX.Element => {
  const pathname = usePathname();

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
