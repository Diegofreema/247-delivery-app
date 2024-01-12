import { Skeleton } from '@rneui/themed';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { LinearComponent } from './LinearComponent';

type Props = {};

export const MapSkeleton = ({}: Props): JSX.Element => {
  const skeletonAnim = useRef(new Animated.Value(-1000)).current;
  useEffect(() => {
    Animated.timing(skeletonAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(skeletonAnim, {
        toValue: -1000,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  }, []);
  return (
    <Animated.View style={{ flex: 1 }}>
      <Skeleton
        animation="pulse"
        LinearGradientComponent={LinearComponent}
        style={{ width: '100%', height: '100%' }}
      />
    </Animated.View>
  );
};
