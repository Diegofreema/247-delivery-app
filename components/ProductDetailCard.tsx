import { Animated, StyleSheet, Text, View } from 'react-native';

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { useEffect, useRef } from 'react';
import { defaultStyle } from '../constants';
import { colors } from '../constants/Colors';
import { PickUp } from '../types';
type Prop = {
  singleProduct?: PickUp;
  product: string;
};
export const ProductDetailCard = ({

  singleProduct,
}: Prop): JSX.Element => {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  }, [slideAnim]);

  return (
    <Animated.View
      style={[
        defaultStyle.container,
        { backgroundColor: 'white', transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View
        style={[
          styles.container,
          { marginTop: 20, paddingVertical: 20, backgroundColor: 'white' },
        ]}
      >
        <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
            Dealer Info
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            backgroundColor: 'white',
          }}
        >
          <View style={[styles.row, { backgroundColor: 'white' }]}>
            <Feather name="user" size={24} color="#FF0000" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Dealer name
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 12,
              flex: 1,
              textAlign: 'right',
              color: 'black',
            }}
          >
            {singleProduct?.sellername}
          </Text>
        </View>
        {/* <Divider style={{ marginVertical: 13 }} /> */}
        {/* <View
          style={[
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              backgroundColor: 'white',
              alignItems: 'flex-start',
            },
          ]}
        >
          <View
            style={[styles.row, { backgroundColor: 'white', marginRight: 5 }]}
          >
            <Entypo name="location-pin" size={24} color={colors.btnColor} />
            <Text
              style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins' }}
            >
              Address
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 12,
              flex: 1,
              color: 'black',
              textAlign: 'right',
            }}
          >
            {formattedLocation}
          </Text>
        </View> */}
        {/* <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            ]}
          >
            <Ionicons name="locate" size={24} color="black" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              State
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {formattedState}
          </Text>
        </View> */}
        {/* <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            ]}
          >
            <Image
              source={require('../assets/images/phone.png')}
              style={{ width: 24, height: 24 }}
            />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Phone number
            </Text>
          </View>
          <Pressable
            onPress={openDialScreen}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <Text
              style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}
            >
              {formattedPhoneNumber}
            </Text>
          </Pressable>
        </View> */}
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                gap: 6,
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}
          >
            <MaterialIcons name="room-preferences" size={24} color="black" />
            <Text
              style={{
                color: 'black',

                fontFamily: 'Poppins',
                fontSize: 12,
                width: 150,
              }}
            >
              Transaction reference
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 12,
              color: 'black',
              flex: 1,
            }}
            numberOfLines={3}
          >
            {singleProduct?.salesreference}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            ]}
          >
            <AntDesign name="calendar" size={24} color="black" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Date
            </Text>
          </View>

          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {singleProduct?.datex}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />

        <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            Product Info
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            backgroundColor: 'white',
            alignItems: 'flex-start',
          }}
        >
          <View
            style={[
              styles.row,
              { backgroundColor: 'white', alignItems: 'center' },
            ]}
          >
            <Feather name="shopping-bag" size={24} color={colors.btnColor} />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Product
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 12,
              color: 'black',
              flex: 1,
              textAlign: 'right',
            }}
          >
            {singleProduct?.product}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            backgroundColor: 'white',
          }}
        >
          <View style={[styles.row, { backgroundColor: 'white' }]}>
            <FontAwesome5 name="weight-hanging" size={24} color="black" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Quantity
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {singleProduct?.qty}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            backgroundColor: 'white',
          }}
        >
          <View style={[styles.row, { backgroundColor: 'white' }]}>
            <Entypo name="price-tag" size={24} color="#FF0000" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Price
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            ₦{singleProduct?.price}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
