import { ActivityIndicator, FlatList } from 'react-native';

import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { EmptyBag } from '../../../components/EmptyBag';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { HeaderComponent } from '../../../components/Header';
import { ProductCards } from '../../../components/ProductCards';
import { View } from '../../../components/Themed';
import { defaultStyle } from '../../../constants';
import { colors } from '../../../constants/Colors';
import { useGetDeliverQuery } from '../../../libs/queries';

export default function TabTwoScreen() {
  const {
    data,

    isError,
    isPaused,
    refetch,
    isPending,
    isRefetching,
  } = useGetDeliverQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
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
  console.log(data);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={[
          defaultStyle.container,
          { flex: 1, paddingTop: 20, backgroundColor: 'white' },
        ]}
      >
        <HeaderComponent>Products To Deliver</HeaderComponent>
        <View style={{ marginBottom: 10 }} />
        <FlatList
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          data={data}
          renderItem={({ item, index }) => (
            <ProductCards {...item} index={index} />
          )}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No product to deliver" />}
        />
      </View>
    </View>
  );
}
