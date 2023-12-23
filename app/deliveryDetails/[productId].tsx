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
import { usePickUp } from '../../libs/mutation';

type Props = {};

const DetailDelivery = (props: Props) => {
  const { productId } = useLocalSearchParams();
  const { mutateAsync, isPending } = usePickUp();

  console.log(productId);
  const openDialScreen = () => {
    // let number = '';
    // if (Platform.OS === 'ios') {
    //   number = `telprompt:${phoneNumber}`;
    // } else {
    //   number = `tel:${phoneNumber}`;
    // }
    // Linking.openURL(number);
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
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
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
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
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
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
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
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
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

            <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
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

            <Text style={{ fontWeight: 'bold', color: 'black' }}>{}</Text>
          </View>
        </View>

        {/* <MyButton
          title="Delivered to Buyer"
          onPress={() => mutateAsync(singleData[0]?.id)}
          color={colors.btnColor}
        /> */}
      </View>
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
