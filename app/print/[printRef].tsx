import { Linking, Platform, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useGetPrint } from '../../libs/queries';
import { useLocalSearchParams } from 'expo-router';
import { NavHeader } from '../../components/NavHeader';
import { MyButton } from '../../components/Mybutton';

import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PrintDetail } from '../../components/PrintDetail';
import { ScrollView } from 'react-native';
type Props = {};

const PrintData = (props: Props) => {
  const { printRef } = useLocalSearchParams();
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const { data, isFetching, isError, isPending, refetch, isPaused } =
    useGetPrint(printRef as string);
  const [retry, setRetry] = useState(false);

  const handleRetry = () => {
    refetch();
    setRetry((prev) => !prev);
  };
  if (isError || isPaused) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong
        </Text>
        <MyButton title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  if (isFetching || isPending) {
    return <LoadingSkeleton />;
  }

  const printData = data[0];

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${data[0]?.phone}`;
    } else {
      number = `tel:${data[0]?.phone}`;
    }
    Linking.openURL(number);
  };
  return (
    <>
      <NavHeader title="Print" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <PrintDetail {...printData} openDialScreen={openDialScreen} />
      </ScrollView>
    </>
  );
};

export default PrintData;
