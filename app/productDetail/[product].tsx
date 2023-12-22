import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useGetPickupQuery } from '../../libs/queries';
import { products } from '../../libs/goods';
import { NavHeader } from '../../components/NavHeader';
import { Divider, Image } from '@rneui/themed';
import { defaultStyle } from '../../constants';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { colors } from '../../constants/Colors';
import { MyButton } from '../../components/Mybutton';

type Props = {};

const ProductDetail = (props: Props) => {
  const { product } = useLocalSearchParams();
  const singleData = products?.filter((item) => item?.id === product);
  const phoneNumber = singleData?.[0]?.phoneNumber;
  console.log(product);
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${phoneNumber}`;
    } else {
      number = `tel:${phoneNumber}`;
    }
    Linking.openURL(number);
  };

  // const { data, isFetching, isError, isPending, isPaused } =
  //   useGetPickupQuery();

  // if (isError) {
  //   return <Text>Error</Text>;
  // }
  // if (isPaused) {
  //   return <Text>Paused</Text>;
  // }

  // if (isPending || isFetching) {
  //   return <Text>Loading</Text>;
  // }

  console.log(singleData);

  return (
    <>
      <NavHeader title="Product details" />
      <View style={defaultStyle.container}>
        <View
          style={[styles.container, { marginTop: 20, paddingVertical: 20 }]}
        >
          <View style={{ paddingHorizontal: 15 }}>
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
            }}
          >
            <View style={styles.row}>
              <Feather name="user" size={24} color="#FF0000" />
              <Text style={{ color: 'black' }}>Dealer name</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {singleData[0]?.dealerName}
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
              <Text style={{ color: 'black' }}>Address</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {singleData[0]?.location}
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
              <Text style={{ color: 'black' }}>State</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {singleData[0]?.state}
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
                source={require('../../assets/images/phone.png')}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: 'black' }}>Phone number</Text>
            </View>
            <Pressable
              onPress={openDialScreen}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {singleData[0]?.phoneNumber}
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
              <Text style={{ color: 'black' }}>Transaction reference</Text>
            </View>
            <Pressable
              onPress={openDialScreen}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {singleData[0]?.salesReference}
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
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={{ color: 'black' }}>Date</Text>
            </View>
            <Pressable
              onPress={openDialScreen}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {singleData[0]?.date}
              </Text>
            </Pressable>
          </View>
        </View>

        <MyButton
          title="Pick up from Merchant"
          onPress={() => console.warn('Pick up from Merchant')}
          color={colors.btnColor}
        />
      </View>
    </>
  );
};

export default ProductDetail;

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
