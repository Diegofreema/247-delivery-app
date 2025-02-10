import { IconNode } from '@rneui/base';
import { Input } from '@rneui/themed';
import { KeyboardTypeOptions } from 'react-native';
import { colors } from '../constants/Colors';

type Props = {
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secured?: boolean;
  errorMessage?: any;
  rightIcon?: IconNode;
};

export const InputComponent = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secured = false,
  errorMessage,
  rightIcon: RightIcon,
}: Props): JSX.Element => {
  return (
    <Input
      rightIcon={RightIcon}
      placeholder={placeholder}
      containerStyle={{
        justifyContent: 'center',
      }}
      inputContainerStyle={{
        borderBottomColor: 'transparent',
        backgroundColor: colors.textBg,
        borderBottomWidth: 0,
        marginHorizontal: -10,
        padding: 8,
        borderRadius: 5,
      }}
      placeholderTextColor={colors.placeHolderColor}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secured}
      errorMessage={errorMessage}
    />
  );
};
