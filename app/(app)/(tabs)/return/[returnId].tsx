import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { defaultStyle } from '../../../../constants';
import { HeaderComponent } from '../../../../components/Header';
import { colors } from '../../../../constants/Colors';
// import { useGeReturn, useGetDeliverQuery } from '../../libs/queries';
import { useCallback, useState } from 'react';

import { EmptyBag } from '../../../../components/EmptyBag';
import { ReturnT } from '../../../../types';
import axios from 'axios';
import { useStoreId } from '../../../../hooks/useAuth';
import { useReturnStore } from '../../../../hooks/useReturn';
import { useGeReturnName } from '../../../../libs/queries';
import { ErrorComponent } from '../../../../components/ErrorComponent';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
import { ReturnCard } from '../../../../components/RetutnCard';
export default function TabTwoScreen() {
  const { id } = useStoreId();
  const { salesId } = useReturnStore();
  const { returnId } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const [returnProducts, setReturnProducts] = useState<ReturnT[]>([]);

  const {
    data: customerData,
    isError,
    isPending,
    refetch: refetchCustomer,
    isPaused,
  } = useGeReturnName();
  console.log('🚀 ~ TabTwoScreen ~ customerData:', customerData?.[1]?.key);

  useFocusEffect(
    useCallback(() => {
      refetchCustomer();
      setReturnProducts([]);
    }, [])
  );

  const handleChange = async (customerId: any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://test.omega12x.net/api.aspx?api=deliveryreturncustomerproducts&agentid=${id}&myuserid=${customerId}`
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
      setReturnProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetchCustomer} />;
  }

  if (loading || isPending) {
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
        {isPending ? (
          <View style={styles2.border}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                marginBottom: 15,
              }}
            >
              <Text>Loading...</Text>
            </View>
          </View>
        ) : (
          <SelectList
            boxStyles={{
              ...styles2.border,
              justifyContent: 'flex-start',
              backgroundColor: 'white',
            }}
            inputStyles={{ textAlign: 'left' }}
            fontFamily="Poppins"
            setSelected={handleChange}
            data={customerData}
            save="key"
            placeholder="Select customer's name"
            search={false}
          />
        )}
        <Text
          onPress={() => router.push('/list')}
          style={{
            fontSize: 16,
            fontFamily: 'Poppins',
            alignSelf: 'flex-end',
            marginTop: 10,
            marginBottom: 10,
            color: colors.btnColor,
          }}
        >
          Return list
        </Text>
        <FlatList
          onRefresh={refetchCustomer}
          refreshing={isPending}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          style={{ flex: 1 }}
          data={returnProducts}
          renderItem={({ item, index }) => (
            <ReturnCard {...item} index={index} />
          )}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No product to return" />}
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

const styles2 = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    minHeight: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
