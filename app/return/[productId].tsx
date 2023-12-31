import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { NavHeader } from '../../components/NavHeader';
import { useReturn } from '../../libs/mutation';
import { Params } from '../../types';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { DetailCard } from '../../components/DetailCard';

const DetailDelivery = () => {
  const {
    address,
    date,
    id,
    info,
    name,
    price,
    product,
    productId,
    quantity,
    salesreference,
  }: Params = useLocalSearchParams();
  const { mutateAsync, isPending } = useReturn();

  if (!id) {
    return <LoadingSkeleton />;
  }

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
        <DetailCard
          salesreference={salesreference}
          BuyerInfo={info}
          id={id}
          datex={date}
          price={price}
          product={product}
          qty={quantity}
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
