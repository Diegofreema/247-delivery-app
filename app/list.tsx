import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { NavHeader } from '../components/NavHeader';
import { useGeReturnList } from '../libs/queries';
import { EmptyBag } from '../components/EmptyBag';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { PickUpCard } from '../components/PickUpCard';

type Props = {};

const list = (props: Props) => {
  const { data, isPending, refetch, isError, isPaused } = useGeReturnList();
  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <LoadingSkeleton />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NavHeader title="Return List" />
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <FlatList
          onRefresh={refetch}
          refreshing={isPending}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item, index }) => (
            <PickUpCard {...item} index={index} />
          )}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="Nothing here" />}
        />
      </View>
    </View>
  );
};

export default list;
