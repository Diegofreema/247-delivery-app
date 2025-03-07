import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { Animated, Pressable } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../constants/Colors';
import { textStyle } from '../constants';
import { Delivered } from '../types';
import { useRouter } from 'expo-router';

import { useEffect, useRef } from 'react';
import { checkTextLength } from '../libs/helper';

interface Props extends Delivered {
  index: number;
  pickUp?: boolean;
}

export const ProductCards = (item: Props): JSX.Element => {
  const router = useRouter();
  console.log({ item: item.id });

  const animatedDirection = item?.index % 2 === 0 ? -1000 : 1000;
  const slideAnim = useRef(new Animated.Value(animatedDirection)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  }, [slideAnim]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
        }}
      >
        <Text style={[textStyle, { fontFamily: 'Poppins', fontSize: 11 }]}>
          {checkTextLength(item?.product)}
        </Text>
        <Pressable
          onPress={() => router.push(`/deliveryDetails/${item?.id}`)}
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              backgroundColor: 'transparent',
            },

            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text
            style={[
              textStyle,
              { fontFamily: 'Poppins', color: colors.btnColor, fontSize: 10 },
            ]}
          >
            View details
          </Text>
          <FontAwesome name="angle-right" size={24} color={colors?.btnColor} />
        </Pressable>
      </View>
      <Divider style={{ marginVertical: 13 }} />
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={{
              backgroundColor: 'gray',
              position: 'absolute',
              left: 8,
              width: 9,
              height: 9,
              top: '95%',
              borderRadius: 6,
            }}
          />
          <View
            style={{
              backgroundColor: 'gray',
              position: 'absolute',
              left: 12,
              width: 1,
              height: 37,
              top: '138%',
            }}
          />
          <View
            style={{
              backgroundColor: 'gray',
              position: 'absolute',
              left: 8,
              width: 9,
              height: 9,
              top: '250%',
              borderRadius: 6,
            }}
          />
          <Entypo name="location-pin" size={24} color={colors.btnColor} />
          <View style={{ backgroundColor: 'transparent' }}>
            <Text
              style={{ color: 'gray', fontFamily: 'Poppins', fontSize: 11 }}
            >
              Address
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                fontFamily: 'Poppins',
              }}
              numberOfLines={1}
            >
              {item?.Buyeraddress}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 45,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Feather name="user" size={24} color="#FF0000" />
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Text
                style={{ color: 'gray', fontFamily: 'Poppins', fontSize: 11 }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Poppins',
                }}
              >
                {item?.Buyername}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <MaterialCommunityIcons
            name="google-circles-communities"
            size={24}
            color="blue"
          />
          <View>
            <Text
              style={{ color: 'gray', fontFamily: 'Poppins', fontSize: 11 }}
            >
              Community
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                fontFamily: 'Poppins',
              }}
            >
              {item?.BuyerCommunity}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: 'white',

    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
