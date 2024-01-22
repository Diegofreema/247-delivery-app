import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import { PickUp } from '../types';
import { textStyle } from '../constants';
import { useRouter } from 'expo-router';
import { colors } from '../constants/Colors';
import { Divider } from '@rneui/themed';

import { useEffect, useRef } from 'react';
import { checkTextLength } from '../libs/helper';
interface Props extends PickUp {
  index: number;
}

export const PickUpItem = (item: Props): JSX.Element => {
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
  const formattedSellerInfo = item?.sellerinfo?.split('<br/>');
  console.log('🚀 ~ PickUpItem ~ item:vv', item);
  const formattedName = formattedSellerInfo[0]?.split('Dealer Name: ');
  const formattedLocation = formattedSellerInfo[2]?.split('Location: ');

  const formattedCommunity = formattedSellerInfo[3]?.split('Community: ');

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
          onPress={() => router.push(`/productDetail/${item?.id}`)}
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
          <FontAwesome name="angle-right" size={24} color={colors.btnColor} />
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
              top: 39,
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
              top: 49,
            }}
          />
          <View
            style={{
              backgroundColor: 'gray',
              position: 'absolute',
              left: 8,
              width: 9,
              height: 9,
              top: 92,
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
                flex: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formattedLocation}
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
                  fontSize: 12,
                  color: 'black',

                  fontFamily: 'Poppins',
                }}
              >
                {formattedName}
              </Text>
            </View>
          </View>
          <View
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
            <Text
              onPress={() =>
                router.push(`/map/${item?.Latitude + '-' + item?.Longitude}`)
              }
              style={{ color: 'black' }}
            >
              View on map
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
