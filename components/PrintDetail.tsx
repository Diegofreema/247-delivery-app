import { StyleSheet, View, Text } from 'react-native';
import { MyButton } from './Mybutton';
import { colors } from '../constants/Colors';
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { PrintData } from '../types';
import * as Print from 'expo-print';
interface Props extends PrintData {
  openDialScreen: () => void;
}

export const PrintDetail = (printData: Props): JSX.Element => {
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
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center background-color: white;">
    <div style='display: flex; flex-direction: column ; align-items: center'>
      <img src='https://247pharmacy.net/images/247pharmacy.png' style="width: 300px; height: 200px; margin-bottom: 10px" alt='logo' object-fit='contain' />

      <p style='color: black; margin-bottom: 5px'>www.247pharmacy.net</p>
      <p style='color: black; margin-bottom: 5px'>support@247pharmacy.net</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 20px;">
      <p style="font-weight: bold;  font-size: 30px">Customer Details</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.customername}</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.addres}</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.community}</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.Statename}</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.phone}</p>
    </div>

    <div style="border-bottom: 1px solid black; border-top: 1px solid black; padding: 10px" />
    
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr>
        <th style=" text-align: left;">Item</th>
        <th style="text-align: left;">Qty</th>
        <th style="text-align: left;">Price (₦)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: left; padding-top: 8px; padding-bottom: 8px;">${printData?.Product}</td>
        <td style="text-align: left; padding-top: 8px; padding-bottom: 8px;">${printData.qty}</td>
        <td style="text-align: left; padding-top: 8px; padding-bottom: 8px;">${printData.total}</td>
      </tr>
   
   
    </tbody>
  </table>
    </div>

  </body>
</html>
`;
  const printReceipt = async () => {
    const response = await Print.printAsync({
      html,
    });
    console.log(response);
  };
  return (
    <Animated.View
      style={{
        marginHorizontal: 20,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View style={[{ backgroundColor: 'white' }]}>
        <View
          style={[
            styles.container,
            {
              marginTop: 20,
              paddingVertical: 20,
              backgroundColor: 'white',
            },
          ]}
        >
          <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
              Customer Details
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
              <Feather name="shopping-bag" size={24} color={colors.btnColor} />
              <Text style={{ color: 'black' }}>Product</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.Product}
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
              <Text style={{ color: 'black' }}>Customer Name</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.customername}
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
            <View style={[styles.row, { backgroundColor: 'white' }]}>
              <Entypo name="location-pin" size={24} color={colors.btnColor} />
              <Text style={{ color: 'black' }}>Address</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.addres}
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
              <MaterialCommunityIcons
                name="town-hall"
                size={24}
                color="black"
              />
              <Text style={{ color: 'black' }}>Community</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.community}
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
              <Ionicons name="locate" size={24} color="black" />
              <Text style={{ color: 'black' }}>State</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.Statename}
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
              <Image
                source={require('../assets/images/phone.png')}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: 'black' }}>Phone number</Text>
            </View>
            <Pressable
              onPress={printData?.openDialScreen}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {printData?.phone}
              </Text>
            </Pressable>
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
                  gap: 6,
                  alignItems: 'flex-start',
                  backgroundColor: 'white',
                },
              ]}
            >
              <MaterialIcons name="room-preferences" size={24} color="black" />
              <Text style={{ color: 'black', marginRight: 5 }}>
                Transaction reference
              </Text>
            </View>

            <Text style={{ fontWeight: 'bold', color: 'black', flex: 1 }}>
              {printData?.salesreference}
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
              <Text style={{ color: 'black' }}>Quantity</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {printData?.qty}
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
              <Text style={{ color: 'black' }}>Price</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              ₦{printData?.total}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 15 }} />
      <MyButton
        onPress={printReceipt}
        title="Print"
        color={colors.btnColor}
        textColor="white"
      />
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
