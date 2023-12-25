import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { defaultStyle, textStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { delivered, products } from '../../libs/goods';
import { colors } from '../../constants/Colors';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useRouter } from 'expo-router';
// import { useGeReturn, useGetDeliverQuery } from '../../libs/queries';
import { MyButton } from '../../components/Mybutton';
import { useEffect, useState } from 'react';

import { EmptyBag } from '../../components/EmptyBag';
import { InputComponent } from '../../components/InputComponent';
import { Delivered } from '../../types';
import axios from 'axios';
import { useStoreId } from '../../hooks/useAuth';
import { useReturnStore } from '../../hooks/useReturn';

export default function TabTwoScreen() {
  const { width } = useWindowDimensions();
  const { id } = useStoreId();
  const { salesId } = useReturnStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [returnProducts, setReturnProducts] = useState<Delivered[]>([]);

  const router = useRouter();
  useEffect(() => {
    if (salesId) {
      const filteredProducts = returnProducts.filter(
        (product) => product?.id !== salesId
      );
      setReturnProducts(filteredProducts);
    }
  }, [salesId]);
  const getProductsToReturn = async () => {
    console.log('pressed');
    if (email === '') return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryreturnlist&agentid=${id}&emailaddress=${email.toLowerCase()}`
      );
      console.log('response', response.data);
      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }
      setEmail('');
      setReturnProducts(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size={100} color={colors.btnColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={[
          defaultStyle.container,
          { flex: 1, paddingTop: 20, backgroundColor: 'white' },
        ]}
      >
        <HeaderComponent>Products To Return</HeaderComponent>
        <View style={{ marginBottom: 20 }} />
        <InputComponent
          rightIcon={
            <AntDesign
              name="search1"
              size={24}
              color="black"
              onPress={getProductsToReturn}
            />
          }
          onChangeText={setEmail}
          value={email}
          placeholder="Search by  email"
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          data={returnProducts}
          renderItem={({ item, index }) => {
            const formattedBuyersInfo = item?.BuyerInfo?.split('<br/>');

            const formattedName = formattedBuyersInfo[0].replace(
              /<strong>(.*?)<\/strong>/g,
              '$1'
            );
            const formattedAddress = formattedBuyersInfo[2];

            return (
              <View style={[styles.container]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={[textStyle, { fontWeight: 'bold', fontSize: 16 }]}
                  >{`Product ${index + 1}`}</Text>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: `/return/${item?.id}`,
                        params: {
                          id: item?.id,
                          address: formattedAddress,
                          name: formattedName,
                          info: formattedBuyersInfo,
                          product: item?.product,
                          quantity: item?.qty,
                          price: item?.price,
                          date: item?.datex,
                          salesreference: item?.salesreference,
                        },
                      })
                    }
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
                        { fontWeight: 'bold', color: colors.btnColor },
                      ]}
                    >
                      View details
                    </Text>
                    <FontAwesome
                      name="angle-right"
                      size={24}
                      color={colors.btnColor}
                    />
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
                        top: 33,
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
                        top: 45,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: 'gray',
                        position: 'absolute',
                        left: 8,
                        width: 9,
                        height: 9,
                        top: 85,
                        borderRadius: 6,
                      }}
                    />
                    <Entypo
                      name="location-pin"
                      size={24}
                      color={colors.btnColor}
                    />
                    <View style={{ backgroundColor: 'transparent' }}>
                      <Text style={{ color: 'gray' }}>Address</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        {formattedAddress}
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
                        <Text style={{ color: 'gray' }}>Name</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'black',
                            fontWeight: '600',
                          }}
                        >
                          {formattedName}
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
                      <Text style={{ color: 'black' }}>View on map</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No products to return" />}
        />
      </View>
    </View>
  );
}

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
