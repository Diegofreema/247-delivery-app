import { View, Animated } from 'react-native';

import { NavHeader } from './NavHeader';
import { Skeleton } from '@rneui/base';
import { LinearComponent } from './LinearComponent';
import { useEffect, useRef } from 'react';

export const LoadingSkeleton = (): JSX.Element => {
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
  }, [skeletonAnim]);
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'white',
        paddingBottom: 20,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          marginHorizontal: 20,
          transform: [{ translateX: skeletonAnim }],
        }}
      >
        <NavHeader title="Product details" />

        <Skeleton
          LinearGradientComponent={LinearComponent}
          animation="pulse"
          style={{
            width: '100%',
            flex: 1,
            borderRadius: 20,
            marginTop: 20,
          }}
        />
        <Skeleton
          LinearGradientComponent={LinearComponent}
          animation="pulse"
          style={{
            width: '100%',
            height: 50,
            borderRadius: 25,
            marginTop: 20,
          }}
        />
      </Animated.View>
    </View>
  );
};
