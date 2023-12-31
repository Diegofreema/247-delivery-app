import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { defaultStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
// import { useGeReturn, useGetDeliverQuery } from '../../libs/queries';
import { useEffect, useState } from 'react';

import { EmptyBag } from '../../components/EmptyBag';
import { InputComponent } from '../../components/InputComponent';
import { Delivered } from '../../types';
import axios from 'axios';
import { useStoreId } from '../../hooks/useAuth';
import { useReturnStore } from '../../hooks/useReturn';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { ProductCards } from '../../components/ProductCards';

export default function TabTwoScreen() {
  const { id } = useStoreId();
  const { salesId } = useReturnStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [returnProducts, setReturnProducts] = useState<Delivered[]>([]);

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

        <Animated.FlatList
          ListHeaderComponent={
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
          }
          entering={SlideInUp.delay(100).springify()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          data={returnProducts}
          renderItem={({ item, index }) => (
            <ProductCards {...item} index={index} />
          )}
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
