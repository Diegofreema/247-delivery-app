import { ActivityIndicator, FlatList, Platform } from 'react-native';
import { EmptyBag } from '../../../components/EmptyBag';
import { HeaderComponent } from '../../../components/Header';
import { View } from '../../../components/Themed';
import { defaultStyle } from '../../../constants';
import { colors } from '../../../constants/Colors';
import { useGetPickupQuery } from '../../../libs/queries';
// import Animated, { SlideInUp } from 'react-native-reanimated';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { PickUpItem } from '../../../components/PickUpItem';
import { useStoreId } from '../../../hooks/useAuth';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

export default function TabOneScreen() {
  const { profile } = useStoreId();

  const [, setExpoPushToken] = useState('');
  const [, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync(profile?.id).then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [profile?.id]);

  const { data, isError, isPaused, isPending, refetch, isRefetching } =
    useGetPickupQuery(profile.id);

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
  // const send = async () => {
  //   await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
  //     subID: '1',
  //     appId: 18094,
  //     appToken: 'XrpSQHg242Xgsh6GkilQD8',
  //     title: 'put your push notification title here as a string',
  //     message: 'put your push notification message here as a string',
  //   });
  // };
  return (
    <View style={[{ flex: 1, paddingTop: 20, backgroundColor: 'white' }]}>
      <View style={[defaultStyle.container, { backgroundColor: 'white' }]}>
        <HeaderComponent>Products To Pick Up</HeaderComponent>
        {/* <Button title={'send'} onPress={schedulePushNotification} /> */}

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
          // ListFooterComponent={() => <Button onPress={playSound}>Play</Button>}
        />
      </View>
    </View>
  );
}
// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here', test: { test1: 'more data' } },
//       sound: 'noti.wav',
//     },
//     trigger: { seconds: 2, channelId: 'preview' },
//   });
// }

async function registerForPushNotificationsAsync(id: string) {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
         new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
  await axios.get(
    `https://247delivery.net/api.aspx?api=updatemobileref&agentid=${id}&agentmobileref=${token}`
  );
  return token;
}
