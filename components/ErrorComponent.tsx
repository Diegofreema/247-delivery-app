import { StyleSheet, View, Text } from 'react-native';
import { MyButton } from './Mybutton';
import { useState } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { PickUp } from '../types';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

type Props = {
  refetch: (options?: RefetchOptions | undefined) => Promise<any>;
};

export const ErrorComponent = ({ refetch }: Props): JSX.Element => {
  const [retry, setRetry] = useState(false);

  const handleRetry = () => {
    refetch();
    setRetry((prev) => !prev);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <Animated.View
        entering={ZoomIn.duration(500)}
        exiting={ZoomOut}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          width: '100%',
        }}
      >
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong
        </Text>
        <View style={{ backgroundColor: 'white', width: '60%' }}>
          <MyButton title="Retry" onPress={handleRetry} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});
