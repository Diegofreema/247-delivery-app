import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
type Props = {
  text: string;
};

export const EmptyBag = ({ text }: Props): JSX.Element => {
  const { height } = useWindowDimensions();
  const pathname = usePathname();
  const dynamicHeight = pathname === '/return' ? 0.5 : 0.7;
  return (
    <View
      style={{
        height: height * dynamicHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image
        source={require('../assets/images/emptyBag.png')}
        style={{ width: 150, height: 150 }}
        contentFit="cover"
        transition={250}
      />
      <Animated.Text
        entering={FadeIn.duration(500)}
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({});
