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
import { useLocalSearchParams } from 'expo-router';
import { useGetDeliverQuery2 } from '../../libs/queries';
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
import { BottomComponent } from '../../components/BottomComponent';
import { Skeleton } from '@rneui/themed';
import { LinearComponent } from '../../components/LinearComponent';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
type Props = {
  productId: string;
};

const DetailDelivery = () => {
  const { productId } = useLocalSearchParams<Props>();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isFetching, isError, isPaused, refetch, isPending } =
    useGetDeliverQuery2();

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
        <View style={{ backgroundColor: 'white', width: '60%' }}>
          <MyButton title="Retry" onPress={handleRetry} />
        </View>
      </View>
    );
  }

  if (isFetching || isPending) {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: 'white',
          paddingBottom: 20,
        }}
      >
        <Animated.View
          exiting={SlideOutLeft}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginHorizontal: 20,
          }}
        >
          <NavHeader title="Product details" />

          <Skeleton
            LinearGradientComponent={LinearComponent}
            animation="wave"
            style={{
              width: '100%',
              flex: 1,
              borderRadius: 20,
              marginTop: 20,
            }}
          />
          <Skeleton
            LinearGradientComponent={LinearComponent}
            animation="wave"
            style={{
              width: '100%',
              height: 50,
              borderRadius: 25,
              marginTop: 20,
            }}
          />
        </Animated.View>
      </View>
    );
  }

  const singleData = data?.filter((product) => product?.id === productId)[0];
  const formattedBuyersInfo = singleData?.BuyerInfo?.split('<br/>');
  const formattedName = formattedBuyersInfo[0].replace(
    /<strong>(.*?)<\/strong>/g,
    '$1'
  );
  const formattedAddress = formattedBuyersInfo[2];
  const formattedNumber = formattedBuyersInfo[1];
  const formattedCommunity = formattedBuyersInfo[3];
  const next = () => {
    setIsVisible(true);
  };
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
    <>
      <NavHeader title="Product details" />
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          style={defaultStyle.container}
        >
          <View
            style={[styles.container, { marginTop: 20, paddingVertical: 20 }]}
          >
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}
              >
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
                <Text style={{ color: 'black' }}>Buyer's name</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
                <Text style={{ color: 'black' }}>Address</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
                <Text style={{ color: 'black' }}>Community</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
                <MaterialIcons
                  name="room-preferences"
                  size={24}
                  color="black"
                />
                <Text style={{ color: 'black', marginRight: 10 }}>
                  Transaction reference
                </Text>
              </View>

              <Text
                style={{
                  fontWeight: 'bold',
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
                <Text style={{ color: 'black' }}>Date</Text>
              </View>

              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {singleData.datex}
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
                <Text style={{ color: 'black' }}>Quantity</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
                <Text style={{ color: 'black' }}>Price</Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                ₦{singleData?.price}
              </Text>
            </View>
          </View>
          <MyButton
            title="Confirm Delivery"
            onPress={() => setIsVisible(true)}
          />
        </Animated.View>
        <BottomComponent
          id={singleData?.id}
          isVisible={isVisible}
          onHide={() => setIsVisible(false)}
        />
      </ScrollView>
    </>
  );
};

export default DetailDelivery;

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
