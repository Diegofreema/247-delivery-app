import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPrint } from '../libs/queries';
import { useLocalSearchParams } from 'expo-router';
import { NavHeader } from '../components/NavHeader';
import { ActivityIndicator } from 'react-native';
import { colors } from '../constants/Colors';
import { MyButton } from '../components/Mybutton';
import { defaultStyle } from '../constants';
import * as Print from 'expo-print';
import { Button } from '@rneui/themed';
import { shareAsync } from 'expo-sharing';
type Props = {};
const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;
const PrintData = (props: Props) => {
  const { printRef } = useLocalSearchParams();
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const { data, isFetching, isError, isPending, refetch, isPaused } =
    useGetPrint(printRef as string);
  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const response = await Print.printAsync({
      html,

      // printerUrl: selectedPrinter?.url, // iOS only
    });

    console.log(response);
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };
  const [retry, setRetry] = useState(false);

  const handleRetry = () => {
    refetch();
    setRetry((prev) => !prev);
  };
  if (isError || isPaused) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong
        </Text>
        <MyButton title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  if (isFetching || isPending) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={50} color={colors.btnColor} />
      </View>
    );
  }
  return (
    <>
      <NavHeader title="Print" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[defaultStyle.container, { flex: 1 }]}>
          <Text>PrintData</Text>
          <Button title="Print" onPress={print} />
          <Button title="Print to PDF file" onPress={printToFile} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PrintData;

const styles = StyleSheet.create({});
