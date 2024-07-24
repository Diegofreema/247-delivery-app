import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { NavHeader } from '../../../components/NavHeader';
import { useReturn } from '../../../libs/mutation';
import { ReturnT } from '../../../types';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { useGeReturnList } from '../../../libs/queries';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { ReturnCom } from '../../../components/ReturnCom';
import { MyButton } from '../../../components/Mybutton';
import { colors } from '../../../constants/Colors';

const DetailDelivery = () => {
  const params = useLocalSearchParams<ReturnT>();

  const {
    BuyerCommunity,
    Buyeraddress,
    Buyername,
    Buyerphone,
    datex,
    id,
    price,
    product,
    qty,
    salesreference,
  } = params;
  const {
    data,
    isPaused,
    isPending: isPendingList,
    refetch,
    isError,
    isFetching,
  } = useGeReturnList();
  const { mutateAsync, isPending } = useReturn(id);

  if (!id || isPendingList) {
    return <LoadingSkeleton />;
  }

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
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
        {/* @ts-ignore */}
        <ReturnCom {...params} />
        <View style={{ marginHorizontal: 20 }}>
          <MyButton
            color={colors.btnColor}
            title="Return"
            onPress={() => mutateAsync()}
            loading={isPending}
          />
        </View>
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
