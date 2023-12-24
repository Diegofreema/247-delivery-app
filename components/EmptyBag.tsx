import { Image } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  text: string;
};

export const EmptyBag = ({ text }: Props): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image
        source={require('../assets/images/emptyBag.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
