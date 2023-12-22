import { ActivityIndicator, View } from 'react-native';
import { Dialog } from '@rneui/themed';
import { colors } from '../constants/Colors';
type Props = {
  isSubmitting: boolean;
};

export const Modal = ({ isSubmitting }: Props): JSX.Element => {
  return (
    <Dialog
      isVisible={isSubmitting}
      overlayStyle={{
        borderWidth: 0,
        width: 150,
        height: 150,
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          borderRadius: 20,

          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size={100} color={colors.btnColor} />
      </View>
    </Dialog>
  );
};
