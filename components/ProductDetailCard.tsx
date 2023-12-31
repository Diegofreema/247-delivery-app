import {
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  Pressable,
} from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { defaultStyle } from '../constants';
import { Divider } from '@rneui/base';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { PickUp } from '../types';
import { colors } from '../constants/Colors';
import { Image } from 'expo-image';
type Prop = {
  singleProduct?: {
    product: string;
    datex: string;
    price: string;
    qty: string;
    id: string;
    salesreference: string;
    sellerinfo: string;
  };
  product: string;
};
export const ProductDetailCard = ({
  product,
  singleProduct,
}: Prop): JSX.Element => {
  const formattedSellerInfo = singleProduct?.sellerinfo?.split('<br/>');
  const formattedName = formattedSellerInfo?.[0]?.split('Dealer Name: ');
  const formattedLocation = formattedSellerInfo?.[2]?.split('Location: ');
  const formattedPhoneNumber =
    formattedSellerInfo?.[1]?.split('Phone Number: ');
  const formattedState = formattedSellerInfo?.[3]?.split('State: ');
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
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={[defaultStyle.container, { backgroundColor: 'white' }]}
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
            <MaterialIcons name="room-preferences" size={24} color="black" />
            <Text style={{ color: 'black', marginRight: 5 }}>
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
            <Text style={{ color: 'black' }}>Date</Text>
          </View>

          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            {singleProduct?.datex}
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
          }}
        >
          <View style={[styles.row, { backgroundColor: 'white' }]}>
            <Feather name="shopping-bag" size={24} color={colors.btnColor} />
            <Text style={{ color: 'black' }}>Product</Text>
          </View>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{product}</Text>
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
