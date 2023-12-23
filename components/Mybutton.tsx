import { Button } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  loading?: boolean;
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
};

export const MyButton = ({
  onPress,
  title,
  color,
  loading,
  textColor = 'white',
}: Props): JSX.Element => {
  return (
    <Button
      color={color}
      onPress={onPress}
      buttonStyle={{ marginTop: 20, height: 50 }}
      titleStyle={{ color: textColor }}
      radius={25}
      loading={loading}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({});
