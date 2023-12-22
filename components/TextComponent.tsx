import { Text, StyleProp, TextStyle } from 'react-native';

type Props = {
  children: React.ReactNode;

  styles?: StyleProp<TextStyle>;
};

export const TextComponent = ({ styles, children }: Props): JSX.Element => {
  return <Text style={[{ color: 'black' }, styles]}>{children}</Text>;
};
