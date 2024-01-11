import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { defaultStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useGetPickupQuery } from '../../libs/queries';
import { EmptyBag } from '../../components/EmptyBag';
// import Animated, { SlideInUp } from 'react-native-reanimated';
import { PickUpItem } from '../../components/PickUpItem';
import { ErrorComponent } from '../../components/ErrorComponent';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

export default function TabOneScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  const {
    data,

    isError,
    isPaused,
    isPending,
    refetch,
    isRefetching,
  } = useGetPickupQuery(productId);

  //

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
  const send = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: '1',
      appId: 18094,
      appToken: 'XrpSQHg242Xgsh6GkilQD8',
      title: 'put your push notification title here as a string',
      message: 'put your push notification message here as a string',
    });
  };
  return (
    <View style={[{ flex: 1, paddingTop: 20, backgroundColor: 'white' }]}>
      <View style={[defaultStyle.container, { backgroundColor: 'white' }]}>
        <HeaderComponent>Products To Pick Up</HeaderComponent>
        {/* <Button title="send" onPress={send} /> */}
        <View style={{ marginBottom: 10 }} />
        <FlatList
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item, index }) => (
            <PickUpItem {...item} index={index} />
          )}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No product to pick up now" />}
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
