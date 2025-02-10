import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export const Back = (): JSX.Element => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={30}
        color="black"
        onPress={() => router.back()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 30,
    left: 15,
    right: 10,
    height: 50,
    width: '100%',
    zIndex: 1000,
    justifyContent: 'center',
  },
});
