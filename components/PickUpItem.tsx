import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { textStyle } from '../constants';
import { colors } from '../constants/Colors';
import { PickUp } from '../types';

import { useEffect, useRef } from 'react';
import { checkTextLength } from '../libs/helper';
interface Props extends PickUp {
  index: number;
}

export const PickUpItem = (item: Props): JSX.Element => {
  // const { mutateAsync, isPending } = useReject(item?.id);
  const router = useRouter();
  const animatedDirection = item?.index % 2 === 0 ? -1000 : 1000;
  const slideAnim = useRef(new Animated.Value(animatedDirection)).current;
  // const pathname = usePathname();
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
  // const handleReject = async () => {
  //   await mutateAsync();
  // };
  const renderStrings = (stringArray: string) => {
    if (stringArray?.length > 15) {
      return stringArray.slice(0, 15) + '...';
    } else {
      return stringArray;
    }
  };
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
            style={[
              textStyle,
              { fontFamily: 'Poppins', color: colors.btnColor, fontSize: 10 },
            ]}
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
              {checkTextLength(item?.selleraddress, 40)}
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
                {renderStrings(item?.sellername)}
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
              style={{ color: 'black', fontSize: 9, fontFamily: 'Poppins' }}
            >
              View on map
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={{ marginHorizontal: 15 }}>
        {pathname === '/' && (
          <MyButton
            color={'red'}
            loading={isPending}
            // disabled={isPending}
            title={'Reject Pickup'}
            onPress={handleReject}
          />
        )}
      </View> */}
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
