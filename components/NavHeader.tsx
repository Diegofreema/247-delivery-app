import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Header } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  title?: string;
};

export const NavHeader = ({ title }: Props): JSX.Element => {
  const router = useRouter();
  return (
    <Header
      backgroundColor="white"
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <AntDesign
        name="arrowleft"
        size={30}
        color="black"
        onPress={() => router.back()}
        style={{ marginLeft: 10 }}
      />
      <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </Text>
    </Header>
  );
};

const styles = StyleSheet.create({});
