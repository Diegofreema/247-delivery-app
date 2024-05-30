import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '../../../components/Themed';
import { defaultStyle } from '../../../constants';
import { HeaderComponent } from '../../../components/Header';
import { colors } from '../../../constants/Colors';
import { useGetPickupQuery } from '../../../libs/queries';
import { EmptyBag } from '../../../components/EmptyBag';
// import Animated, { SlideInUp } from 'react-native-reanimated';
import { PickUpItem } from '../../../components/PickUpItem';
import { ErrorComponent } from '../../../components/ErrorComponent';
import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useStoreId } from '../../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Audio, InterruptionModeAndroid } from 'expo-av';
import { Button } from '@rneui/themed';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();

//   console.log(
//     `Got background fetch call at date: ${new Date(now).toISOString()}`
//   );

//   // Be sure to return the successful result type!
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!

export default function TabOneScreen() {
  // const [isRegistered, setIsRegistered] = useState(false);
  // const [status, setStatus] =
  //   useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  // useEffect(() => {
  //   checkStatusAsync();
  // }, []);
  // async function registerBackgroundFetchAsync() {
  //   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
  //     minimumInterval: 1 * 60, // 15 minutes
  //     stopOnTerminate: false, // android only,
  //     startOnBoot: true, // android only
  //   });
  // }

  // async function unregisterBackgroundFetchAsync() {
  //   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  // }

  // const checkStatusAsync = async () => {
  //   const status = await BackgroundFetch.getStatusAsync();
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(
  //     BACKGROUND_FETCH_TASK
  //   );
  //   setStatus(status);
  //   setIsRegistered(isRegistered);
  // };

  // const toggleFetchTask = async () => {
  //   if (isRegistered) {
  //     await unregisterBackgroundFetchAsync();
  //   } else {
  //     await registerBackgroundFetchAsync();
  //   }

  //   checkStatusAsync();
  // };
  const { profile } = useStoreId();
  // console.log('vddmfkgdkfng');

  const { data, isError, isPaused, isPending, refetch, isRefetching } =
    useGetPickupQuery(profile.id);
  // const [sound, setSound] = useState<Audio.Sound>();

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('../../../assets/sound.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   Audio.setAudioModeAsync({
  //     staysActiveInBackground: true,
  //     playThroughEarpieceAndroid: true,
  //     interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
  //     shouldDuckAndroid: true,
  //   });
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
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
        {/* <Button
          title={
            isRegistered
              ? 'Unregister BackgroundFetch task'
              : 'Register BackgroundFetch task'
          }
          onPress={toggleFetchTask}
        />
        <Text>{status && BackgroundFetch.BackgroundFetchStatus[status]}</Text> */}
        {/* <Text>
          {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
        </Text> */}
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
