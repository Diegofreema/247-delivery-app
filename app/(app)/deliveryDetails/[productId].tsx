import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useGetDeliverQuery2 } from '../../../libs/queries';
import { NavHeader } from '../../../components/NavHeader';
import { BottomComponent } from '../../../components/BottomComponent';
import { DetailCard } from '../../../components/DetailCard';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { ErrorComponent } from '../../../components/ErrorComponent';
type Props = {
  productId: string;
};

const DetailDelivery = () => {
  const { productId } = useLocalSearchParams<Props>();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isFetching, isError, isPaused, refetch, isPending } =
    useGetDeliverQuery2();

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isFetching || isPending) {
    return <LoadingSkeleton />;
  }

  const singleData = data?.filter((product) => product?.id === productId)[0];

  const next = () => {
    setIsVisible(true);
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
        <DetailCard {...singleData} setIsVisible={setIsVisible} />
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
