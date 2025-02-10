import { Button } from '@rneui/themed';

type Props = {
  loading?: boolean;
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
};

export const MyButton = ({
  onPress,
  title,
  color,
  loading,
  textColor = 'white',
  disabled,
}: Props): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      disabledStyle={{ opacity: 0.3 }}
      color={color}
      onPress={onPress}
      buttonStyle={{ marginTop: 20, height: 50 }}
      titleStyle={{ color: textColor, fontFamily: 'Poppins', fontSize: 12 }}
      radius={25}
      loading={loading}
    >
      {title}
    </Button>
  );
};
