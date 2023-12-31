import { View } from 'react-native';
import Animated, { SlideOutLeft } from 'react-native-reanimated';
import { NavHeader } from './NavHeader';
import { Skeleton } from '@rneui/base';
import { LinearComponent } from './LinearComponent';

type Props = {};

export const LoadingSkeleton = (): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'white',
        paddingBottom: 20,
      }}
    >
      <Animated.View
        exiting={SlideOutLeft}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          marginHorizontal: 20,
        }}
      >
        <NavHeader title="Product details" />

        <Skeleton
          LinearGradientComponent={LinearComponent}
          animation="wave"
          style={{
            width: '100%',
            flex: 1,
            borderRadius: 20,
            marginTop: 20,
          }}
        />
        <Skeleton
          LinearGradientComponent={LinearComponent}
          animation="wave"
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
