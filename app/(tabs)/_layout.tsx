import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors, { colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Text } from '@rneui/themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingVertical: 10,
            paddingBottom: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Pick up',
            tabBarIcon: ({ size, focused }) => (
              <Entypo
                name="shopping-cart"
                size={size}
                style={{ marginBottom: -3 }}
                color={focused ? colors.btnColor : 'black'}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.btnColor : '#000',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Pick up
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="deliver"
          options={{
            title: 'Deliver',
            tabBarIcon: ({ size, focused }) => (
              <MaterialCommunityIcons
                name="truck-delivery"
                size={size}
                style={{ marginBottom: -3 }}
                color={focused ? colors.btnColor : 'black'}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.btnColor : '#000',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Deliver
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="return"
          options={{
            title: 'Return',
            tabBarIcon: ({ size, focused }) => (
              <Ionicons
                name="return-down-back"
                size={size}
                style={{ marginBottom: -3 }}
                color={focused ? colors.btnColor : 'black'}
              />
            ),

            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.btnColor : '#000',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Return
              </Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
