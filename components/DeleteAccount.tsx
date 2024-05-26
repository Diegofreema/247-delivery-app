import { ActivityIndicator, View } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { colors } from '../constants/Colors';
import { useDelete } from '../hooks/useDelete';
import { useDeleteAccount } from '../libs/mutation';
type Props = {
  isSubmitting: boolean;
};

export const DeleteModal = (): JSX.Element => {
  const { isOpen, onClose } = useDelete();
  const { mutateAsync, isPending } = useDeleteAccount();
  const onDeleteAccount = async () => {
    await mutateAsync();
  };
  return (
    <Dialog
      isVisible={isOpen}
      overlayStyle={{
        borderWidth: 0,
        width: 300,
        height: 300,
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          borderRadius: 20,
          gap: 5,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
          This account is not reversible
        </Text>
        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
          Are you sure about this?
        </Text>
        <View style={{ flexDirection: 'column', gap: 5, marginTop: 10 }}>
          <Button
            buttonStyle={{ backgroundColor: 'green', borderRadius: 5 }}
            onPress={onClose}
          >
            No
          </Button>
          <Button
            loading={isPending}
            onPress={onDeleteAccount}
            buttonStyle={{
              backgroundColor: 'red',
              width: '100%',
              borderRadius: 5,
            }}
          >
            Yes
          </Button>
        </View>
      </View>
    </Dialog>
  );
};
