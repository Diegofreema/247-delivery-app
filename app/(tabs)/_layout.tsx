import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
          name="[productId]"
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
                  fontFamily: 'Poppins',
                  fontSize: 10,
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
                  fontFamily: 'Poppins',
                  fontSize: 10,
                }}
              >
                Deliver
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="return/[returnId]"
          options={{
            title: 'Return',
            tabBarIcon: ({ size, focused }) => (
              <Entypo
                name="back"
                size={size}
                style={{ marginBottom: -3 }}
                color={focused ? colors.btnColor : 'black'}
              />
            ),

            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.btnColor : '#000',
                  fontFamily: 'Poppins',
                  fontSize: 10,
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
