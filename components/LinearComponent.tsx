import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
type Props = {};

export const LinearComponent = ({}: Props): JSX.Element => {
  return (
    <LinearGradient
      colors={[
        'rgba(0,0,0,0.8)',
        'rgba(0,0,0,0.5)',
        'rgba(0,0,0,0.3)',
        'rgba(0,0,0,0.5)',
        'rgba(0,0,0,0.8)',
      ]}
    />
  );
};

const styles = StyleSheet.create({});
