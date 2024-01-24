import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { defaultStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useFocusEffect, useRouter } from 'expo-router';
import { useGetDeliverQuery } from '../../libs/queries';
import { EmptyBag } from '../../components/EmptyBag';
import { ProductCards } from '../../components/ProductCards';
import { ErrorComponent } from '../../components/ErrorComponent';
import { useCallback } from 'react';

export default function TabTwoScreen() {
  const {
    data,
    isFetching,
    isError,
    isPaused,
    refetch,
    isPending,
    isRefetching,
  } = useGetDeliverQuery();
  const router = useRouter();

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

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
