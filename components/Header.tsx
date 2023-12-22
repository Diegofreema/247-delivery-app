import { Header, Text } from '@rneui/themed';
import { PropsWithChildren } from 'react';

import { StyleSheet, View } from 'react-native';

type Props = {
  children: PropsWithChildren<any>;
  placement?: 'left' | 'center' | 'right';
};

export const HeaderComponent = ({
  children,
  placement,
}: Props): JSX.Element => {
  return (
    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});
