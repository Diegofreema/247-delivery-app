import {
  StyleSheet,
  View,
  Text,
  Linking,
  Pressable,
  Animated,
} from 'react-native';
import { MyButton } from './Mybutton';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';

import { defaultStyle } from '../constants';
import { Divider } from '@rneui/base';
import { Platform } from 'react-native';
import { Delivered, ReturnType } from '../types';
import { colors } from '../constants/Colors';
import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';

type Props = {
  setIsVisible?: (val: boolean) => void;
};

export const ReturnCard = (singleData: ReturnType & Props): JSX.Element => {
  console.log('🚀 ~ ReturnCard ~ singleData:', singleData);
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
  }, []);
  const formattedBuyersInfo = singleData?.sellerinfo?.split('<br/>');
  console.log(
    '🚀 ~ DetailCard ~ singleData?.sellerinfo:',
    singleData?.sellerinfo
  );
  const formattedName = formattedBuyersInfo[0].replace(
    /<strong>(.*?)<\/strong>/g,
    '$1'
  );

  const formattedAddress = formattedBuyersInfo[2];
  const formattedNumber = formattedBuyersInfo[1];
  const formattedCommunity = formattedBuyersInfo[3];

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${formattedNumber}`;
    } else {
      number = `tel:${formattedNumber}`;
    }
    Linking.openURL(number);
  };
  return (
    <Animated.View
      style={[
        defaultStyle.container,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={[styles.container, { marginTop: 20, paddingVertical: 20 }]}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
            Buyer's Info
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
        >
          <View style={styles.row}>
            <Feather name="user" size={24} color="#FF0000" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Buyer's name
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {formattedName}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            { paddingHorizontal: 15, justifyContent: 'space-between' },
          ]}
        >
          <View style={styles.row}>
            <Entypo name="location-pin" size={24} color={colors.btnColor} />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Address
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
            {formattedAddress}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            { paddingHorizontal: 15, justifyContent: 'space-between' },
          ]}
        >
          <View style={styles.row}>
            <Ionicons name="locate" size={24} color="black" />
            <Text
              style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}
            >
              Community
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {formattedCommunity}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            { paddingHorizontal: 15, justifyContent: 'space-between' },
          ]}
        >
          <View style={styles.row}>
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
              {formattedNumber}
            </Text>
          </Pressable>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            { paddingHorizontal: 15, justifyContent: 'space-between' },
          ]}
        >
          <View style={styles.row}>
            <MaterialIcons name="room-preferences" size={24} color="black" />
            <Text
              style={{
                color: 'black',
                marginRight: 10,
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
              marginRight: -10,
            }}
          >
            {singleData?.salesreference}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />
        <View
          style={[
            styles.row,
            { paddingHorizontal: 15, justifyContent: 'space-between' },
          ]}
        >
          <View style={styles.row}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text
              style={{ color: 'black', fontFamily: 'Poppins', fontSize: 12 }}
            >
              Date
            </Text>
          </View>

          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'black' }}>
            {singleData.datex}
          </Text>
        </View>
        <Divider style={{ marginVertical: 13 }} />

        <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
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
          <View style={[styles.row, { backgroundColor: 'white' }]}>
            <Feather name="shopping-bag" size={24} color={colors.btnColor} />
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins',
                marginRight: 5,
                fontSize: 12,
              }}
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
            {singleData?.product}
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
            {singleData?.qty}
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
            ₦{singleData?.price}
          </Text>
        </View>
      </View>
      {singleData.setIsVisible && (
        <MyButton
          title="Confirm Delivery"
          onPress={() =>
            singleData.setIsVisible && singleData?.setIsVisible(true)
          }
        />
      )}
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
