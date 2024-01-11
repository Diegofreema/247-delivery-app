import { StyleSheet, View, useWindowDimensions, Animated } from 'react-native';

import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
type Props = {
  text: string;
};

export const EmptyBag = ({ text }: Props): JSX.Element => {
  const { height } = useWindowDimensions();
  const imgAnim = useRef(new Animated.Value(-1000)).current;
  const textAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    Animated.timing(imgAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(textAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });
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
      <Animated.View style={{ transform: [{ translateX: imgAnim }] }}>
        <Image
          source={require('../assets/images/emptyBag.png')}
          style={{
            width: 150,
            height: 150,
          }}
          contentFit="cover"
          transition={250}
        />
      </Animated.View>
      <Animated.Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          transform: [{ translateX: textAnim }],
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({});
