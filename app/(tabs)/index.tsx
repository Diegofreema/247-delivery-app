import { ActivityIndicator, Platform, StyleSheet, Alert } from 'react-native';
import { View } from '../../components/Themed';
import { defaultStyle } from '../../constants';
import { HeaderComponent } from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useGetPickupQuery } from '../../libs/queries';
import { useEffect, useRef, useState } from 'react';
import { EmptyBag } from '../../components/EmptyBag';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { PickUp } from '../../types';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { PickUpItem } from '../../components/PickUpItem';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Button } from 'react-native';
import axios from 'axios';
import { useStoreId } from '../../hooks/useAuth';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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

  const { id } = useStoreId();

  const [products, setProducts] = useState<PickUp[] | undefined>(data);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync(id).then((token) =>
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

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
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

  const sendPushNotification = async () => {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: [expoPushToken],
        title: 'Your title',
        body: 'Body of your push notification',
      }),
    });
  };

  return (
    <View style={[{ flex: 1, paddingTop: 20, backgroundColor: 'white' }]}>
      <View style={[defaultStyle.container, { backgroundColor: 'white' }]}>
        <HeaderComponent>Products To Pick Up</HeaderComponent>

        <View style={{ marginBottom: 20 }} />
        <Button title="Send Push" onPress={sendPushNotification} />
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

async function registerForPushNotificationsAsync(id: string) {
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
    const res = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliveryupdateagentref&agentid=${id}&agentRef=${token} `
    );

    console.log(res, 'token');
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
