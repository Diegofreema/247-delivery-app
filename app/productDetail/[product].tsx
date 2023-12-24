import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPickupQuery } from '../../libs/queries';
import { products } from '../../libs/goods';
import { NavHeader } from '../../components/NavHeader';
import { Divider, Image } from '@rneui/themed';
import { defaultStyle } from '../../constants';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { colors } from '../../constants/Colors';
import { MyButton } from '../../components/Mybutton';
import { ActivityIndicator } from 'react-native';
import { usePickUp } from '../../libs/mutation';

type Props = {};

const ProductDetail = (props: Props) => {
  const { product } = useLocalSearchParams();
  const router = useRouter();

  const { data, isFetching, isError, isPaused, isPending, refetch } =
    useGetPickupQuery();
  const { isPending: isPickUpPending, mutateAsync } = usePickUp();
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

  const singleProduct = data?.filter((item) => item?.id === product)[0];

  const formattedSellerInfo = singleProduct?.sellerinfo?.split('<br/>');
  const formattedName = formattedSellerInfo[0]?.split('Dealer Name: ');
  const formattedLocation = formattedSellerInfo[2]?.split('Location: ');
  const formattedPhoneNumber = formattedSellerInfo[1]?.split('Phone Number: ');
  const formattedState = formattedSellerInfo[3]?.split('State: ');
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${formattedPhoneNumber}`;
    } else {
      number = `tel:${formattedPhoneNumber}`;
    }
    Linking.openURL(number);
  };
  return (
    <>
      <NavHeader title="Product details" />
      <ScrollView
        style={{ backgroundColor: 'white' }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[defaultStyle.container, { backgroundColor: 'white' }]}>
          <View
            style={[
              styles.container,
              { marginTop: 20, paddingVertical: 20, backgroundColor: 'white' },
            ]}
          >
            <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}
              >
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
                <Text style={{ color: 'black' }}>Dealer name</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {formattedName}
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
                {formattedLocation}
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
                {formattedState}
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
                  {formattedPhoneNumber}
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
                {singleProduct.salesreference}
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
                <Text style={{ color: 'black' }}>Date</Text>
              </View>

              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {singleProduct?.datex}
              </Text>
            </View>
            <Divider style={{ marginVertical: 13 }} />

            <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}
              >
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
                <Text style={{ color: 'black' }}>Quantity</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
                <Text style={{ color: 'black' }}>Price</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                ₦{singleProduct?.price}
              </Text>
            </View>
          </View>
          <MyButton
            title="Print Receipt"
            onPress={() => router.push(`/${singleProduct?.id}`)}
            color={colors.btnGray}
            textColor="black"
          />
          <MyButton
            title="Pick up from Merchant"
            onPress={() => mutateAsync(singleProduct?.id)}
            color={colors.btnColor}
            loading={isPickUpPending}
          />
        </View>
      </ScrollView>
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
