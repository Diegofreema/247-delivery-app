import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { defaultStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useGetPickupQuery } from '../../libs/queries';
import { EmptyBag } from '../../components/EmptyBag';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { PickUpItem } from '../../components/PickUpItem';
import { ErrorComponent } from '../../components/ErrorComponent';
import registerNNPushToken from 'native-notify';

const appId = process.env.EXPO_PUBLIC_APP_ID;
const appToken = process.env.EXPO_PUBLIC_APP_TOKEN;

export default function TabOneScreen() {
  const {
    data,

    isError,
    isPaused,
    isPending,
    refetch,
    isRefetching,
  } = useGetPickupQuery();

  registerNNPushToken(appId, appToken);

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

  return (
    <View style={[{ flex: 1, paddingTop: 20, backgroundColor: 'white' }]}>
      <View style={[defaultStyle.container, { backgroundColor: 'white' }]}>
        <HeaderComponent>Products To Pick Up</HeaderComponent>

        <View style={{ marginBottom: 20 }} />

        <Animated.FlatList
          entering={SlideInUp.delay(100).springify()}
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
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
