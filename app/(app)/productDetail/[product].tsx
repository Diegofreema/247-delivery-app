import { ScrollView, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPickupQuery2 } from '../../../libs/queries';
import { NavHeader } from '../../../components/NavHeader';
import { colors } from '../../../constants/Colors';
import { MyButton } from '../../../components/Mybutton';
import { usePickUp } from '../../../libs/mutation';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { ProductDetailCard } from '../../../components/ProductDetailCard';
import { ErrorComponent } from '../../../components/ErrorComponent';

type Props = {
  product: string;
};

const ProductDetail = () => {
  const { product } = useLocalSearchParams<Props>();
  const router = useRouter();

  const { isPending: isPickUpPending, mutateAsync } = usePickUp();
  const {
    data: products,
    isFetching,
    isError,
    isPaused,
    isPending,
    refetch,
  } = useGetPickupQuery2();

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isFetching || isPending) {
    return <LoadingSkeleton />;
  }
  const singleProduct = products?.find((item) => item?.id === product);

  return (
    <>
      <NavHeader title="Product details" />
      <ScrollView
        style={{ backgroundColor: 'white' }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProductDetailCard product={product} singleProduct={singleProduct} />

        <View style={{ marginHorizontal: 20 }}>
          <MyButton
            title="Print Receipt"
            onPress={() => router.push(`/print/${product}`)}
            color={colors.btnGray}
            textColor="black"
          />
          <MyButton
            title="Pick up from Merchant"
            onPress={() => mutateAsync(product)}
            color={colors.btnColor}
            loading={isPickUpPending}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetail;
