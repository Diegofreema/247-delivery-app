import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { defaultStyle, textStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { delivered, products } from '../../libs/goods';
import { colors } from '../../constants/Colors';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useGetDeliverQuery } from '../../libs/queries';
import { MyButton } from '../../components/Mybutton';
import { useState } from 'react';
import { EmptyBag } from '../../components/EmptyBag';

export default function TabTwoScreen() {
  const { width } = useWindowDimensions();
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
        <View style={{ marginBottom: 20 }} />
        <FlatList
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}
          data={data}
          renderItem={({ item, index }) => {
            const formattedBuyersInfo = item?.BuyerInfo?.split('<br/>');

            const formattedName = formattedBuyersInfo[0].replace(
              /<strong>(.*?)<\/strong>/g,
              '$1'
            );
            const formattedAddress = formattedBuyersInfo[2];
            const formattedCommunity = formattedBuyersInfo[3];

            return (
              <View style={[styles.container]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={[textStyle, { fontWeight: 'bold', fontSize: 16 }]}
                  >{`Product ${index + 1}`}</Text>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: `/deliveryDetails/${item?.id}`,
                      })
                    }
                    style={({ pressed }) => [
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        backgroundColor: 'transparent',
                      },

                      { opacity: pressed ? 0.8 : 1 },
                    ]}
                  >
                    <Text
                      style={[
                        textStyle,
                        { fontWeight: 'bold', color: colors.btnColor },
                      ]}
                    >
                      View details
                    </Text>
                    <FontAwesome
                      name="angle-right"
                      size={24}
                      color={colors.btnColor}
                    />
                  </Pressable>
                </View>
                <Divider style={{ marginVertical: 13 }} />
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: 'gray',
                        position: 'absolute',
                        left: 8,
                        width: 9,
                        height: 9,
                        top: 33,
                        borderRadius: 6,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: 'gray',
                        position: 'absolute',
                        left: 12,
                        width: 1,
                        height: 37,
                        top: 45,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: 'gray',
                        position: 'absolute',
                        left: 8,
                        width: 9,
                        height: 9,
                        top: 85,
                        borderRadius: 6,
                      }}
                    />
                    <Entypo
                      name="location-pin"
                      size={24}
                      color={colors.btnColor}
                    />
                    <View style={{ backgroundColor: 'transparent' }}>
                      <Text style={{ color: 'gray' }}>Address</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        {formattedAddress}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 45,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Feather name="user" size={24} color="#FF0000" />
                      <View
                        style={{
                          backgroundColor: 'transparent',
                        }}
                      >
                        <Text style={{ color: 'gray' }}>Name</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'black',
                            fontWeight: '600',
                          }}
                        >
                          {formattedName}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => router.push(`/map/${formattedCommunity}`)}
                      style={{
                        backgroundColor: '#ECECEC',
                        padding: 12,
                        borderRadius: 20,
                        gap: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Feather name="map" size={20} color="black" />
                      <Text style={{ color: 'black' }}>View on map</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No products to deliver" />}
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
