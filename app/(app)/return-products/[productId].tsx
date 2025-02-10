import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { MyButton } from '../../../components/Mybutton';
import { NavHeader } from '../../../components/NavHeader';
import { ReturnCom } from '../../../components/ReturnCom';
import { colors } from '../../../constants/Colors';
import { useReturn } from '../../../libs/mutation';
import { useGeReturnList } from '../../../libs/queries';
import { ReturnT } from '../../../types';

const DetailDelivery = () => {
  const params = useLocalSearchParams<ReturnT>();

  const { id } = params;
  const {
    isPaused,
    isPending: isPendingList,
    refetch,
    isError,
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
