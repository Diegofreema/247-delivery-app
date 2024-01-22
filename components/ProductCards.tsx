import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
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
  }, []);
  const formattedBuyersInfo = item?.BuyerInfo?.split('<br/>');

  const formattedName = formattedBuyersInfo[0].replace(
    /<strong>(.*?)<\/strong>/g,
    '$1'
  );
  const formattedAddress = formattedBuyersInfo[2];
  const formattedCommunity = formattedBuyersInfo[3];

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
        <Text
          style={[
            textStyle,
            { fontWeight: 'bold', fontSize: 16, fontFamily: 'Poppins' },
          ]}
        >
          {checkTextLength(item?.product)}
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/deliveryDetails/${item?.id}`,
            })
          }
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
            style={[textStyle, { fontWeight: 'bold', color: colors.btnColor }]}
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
              top: 33,
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
              top: 45,
            }}
          />
          <View
            style={{
              backgroundColor: 'gray',
              position: 'absolute',
              left: 8,
              width: 9,
              height: 9,
              top: 85,
              borderRadius: 6,
            }}
          />
          <Entypo name="location-pin" size={24} color={colors.btnColor} />
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={{ color: 'gray' }}>Address</Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: '600',
              }}
            >
              {formattedAddress}
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
              <Text style={{ color: 'gray' }}>Name</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: '600',
                }}
              >
                {formattedName}
              </Text>
            </View>
          </View>
          {/* {item?.pickUp && (
            <Pressable
              onPress={() => router.push(`/map/${formattedCommunity}`)}
              style={{
                backgroundColor: '#ECECEC',
                padding: 12,
                borderRadius: 20,
                gap: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name="map" size={20} color="black" />
              <Text style={{ color: 'black' }}>View on map</Text>
            </Pressable>
          )} */}
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
