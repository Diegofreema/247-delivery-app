import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Text, View } from '../../components/Themed';
import { defaultStyle, textStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useStoreId } from '../../hooks/useAuth';
import { useGetPickupQuery } from '../../libs/queries';
import { useEffect, useRef, useState } from 'react';
import { MyButton } from '../../components/Mybutton';
import { EmptyBag } from '../../components/EmptyBag';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { PickUp } from '../../types';
import axios from 'axios';
import Animated, { SlideInUp } from 'react-native-reanimated';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const notificationfn = async () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pick up notification',
      body: 'New Products Available For Pickup',
    },
    trigger: null,
  });
};
export default function TabOneScreen() {
  const {
    data,
    isFetching,
    isError,
    isPaused,
    isPending,
    refetch,
    isRefetching,
  } = useGetPickupQuery();
  const router = useRouter();
  const { id } = useStoreId();

  const [retry, setRetry] = useState(false);
  const [products, setProducts] = useState<PickUp[] | undefined>(data);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    if (notificationListener?.current) {
      notificationListener.current =
        Notifications?.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
    }

    responseListener.current =
      Notifications?.addNotificationResponseReceivedListener((response) => {
        return response;
      });

    return () => {
      Notifications?.removeNotificationSubscription(
        notificationListener?.current as any
      );
      Notifications?.removeNotificationSubscription(
        responseListener?.current as any
      );
    };
  }, []);
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
          data={products}
          renderItem={({ item, index }) => {
            const formattedSellerInfo = item?.sellerinfo?.split('<br/>');
            const formattedName =
              formattedSellerInfo[0]?.split('Dealer Name: ');
            const formattedLocation =
              formattedSellerInfo[2]?.split('Location: ');

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
                    onPress={() => router.push(`/productDetail/${item?.id}`)}
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
                        {formattedLocation}
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
                    <View
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
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, i) => item?.id + i}
          ListEmptyComponent={<EmptyBag text="No products to pick up now" />}
        />
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform?.OS === 'android') {
    await Notifications?.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications?.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications?.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        "Permissions weren't granted!",
        'Notifications need permission'
      );
      return;
    }

    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
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
