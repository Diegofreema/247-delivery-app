import {
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPrint } from '../libs/queries';
import { useLocalSearchParams } from 'expo-router';
import { NavHeader } from '../components/NavHeader';
import { ActivityIndicator } from 'react-native';
import { colors } from '../constants/Colors';
import { MyButton } from '../components/Mybutton';
import { defaultStyle } from '../constants';
import * as Print from 'expo-print';
import { Button, Divider } from '@rneui/themed';
import { shareAsync } from 'expo-sharing';
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
type Props = {};

const PrintData = (props: Props) => {
  const { printRef } = useLocalSearchParams();
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const { data, isFetching, isError, isPending, refetch, isPaused } =
    useGetPrint(printRef as string);
  const [retry, setRetry] = useState(false);

  const handleRetry = () => {
    refetch();
    setRetry((prev) => !prev);
  };
  if (isError || isPaused) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong
        </Text>
        <MyButton title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  if (isFetching || isPending) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size={100} color={colors.btnColor} />
      </View>
    );
  }

  const printData = data[0];
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
     Customer Details
    </h1>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Customer Name</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.customername}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Address </p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.addres}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Community</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.community}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">State</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.Statename}</p>
    </div>
     <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between ">
      <p style="font-weight: bold;  font-size: 20px">Phone Number</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.phone}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Product</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.Product}</p>
    </div>
   
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Quantity</p>
      <p style="font-weight: bold;  font-size: 20px">${printData?.qty}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p style="font-weight: bold;  font-size: 20px">Sales Reference</p>
      <p style="font-weight: bold;  font-size: 20px; width: 70%">${printData?.salesreference}</p>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: space-between">
      <p>Total price</p>
      <p>${printData?.total}</p>
    </div>
  </body>
</html>
`;
  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const response = await Print.printAsync({
      html,

      // printerUrl: selectedPrinter?.url, // iOS only
    });

    console.log(response);
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${data[0]?.phone}`;
    } else {
      number = `tel:${data[0]?.phone}`;
    }
    Linking.openURL(number);
  };
  return (
    <>
      <NavHeader title="Print" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'white',
            paddingBottom: 50,
          }}
          style={[
            defaultStyle.container,
            {
              flex: 1,
              backgroundColor: 'white',
              paddingBottom: 50,
              marginTop: -25,
            },
          ]}
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
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}
                >
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
                  <Feather
                    name="shopping-bag"
                    size={24}
                    color={colors.btnColor}
                  />
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
                  <Entypo
                    name="location-pin"
                    size={24}
                    color={colors.btnColor}
                  />
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
                  onPress={openDialScreen}
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
                  <MaterialIcons
                    name="room-preferences"
                    size={24}
                    color="black"
                  />
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
            onPress={print}
            title="Print"
            color={colors.btnColor}
            textColor="white"
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PrintData;

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
