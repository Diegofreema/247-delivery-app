import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { HeaderComponent } from '../../../../components/Header';
import { defaultStyle } from '../../../../constants';
import { colors } from '../../../../constants/Colors';
// import { useGeReturn, useGetDeliverQuery } from '../../libs/queries';
import { useCallback, useState } from 'react';

import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
import { EmptyBag } from '../../../../components/EmptyBag';
import { ErrorComponent } from '../../../../components/ErrorComponent';
import { ReturnCard } from '../../../../components/RetutnCard';
import { useStoreId } from '../../../../hooks/useAuth';
import { useGeReturnName } from '../../../../libs/queries';
import { ReturnT } from '../../../../types';
import { api } from '../../../../libs/helper';
export default function TabTwoScreen() {
  const { profile } = useStoreId();

  const [loading, setLoading] = useState(false);

  const [returnProducts, setReturnProducts] = useState<ReturnT[]>([]);

  const {
    data: customerData,
    isError,
    isPending,
    refetch: refetchCustomer,
    isPaused,
  } = useGeReturnName();

  useFocusEffect(
    useCallback(() => {
      refetchCustomer();
      setReturnProducts([]);
    }, [refetchCustomer])
  );

  const handleChange = async (customerId: any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api}=deliveryreturncustomerproducts&agentid=${profile?.id}&myuserid=${customerId}`
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
          <View>
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
              // ...styles2.border,
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
