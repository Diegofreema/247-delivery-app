import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

type Props = {};

const MapScreen = (props: Props) => {
  const { communityName } = useLocalSearchParams();
  console.log(communityName);

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
        Coming soon
      </Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
