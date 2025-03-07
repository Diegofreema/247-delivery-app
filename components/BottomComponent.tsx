import { BottomSheet } from '@rneui/themed';
import { Text, View } from 'react-native';
import { useSignature } from '../hooks/useGetSig';
import { useDeliver } from '../libs/mutation';
import { MyButton } from './Mybutton';
import { SignatureComponent } from './SignatureComponent';
type Props = {
  isVisible: boolean;
  id: string;
  onHide: () => void;
};

export const BottomComponent = ({
  isVisible,
  onHide,
  id,
}: Props): JSX.Element => {
  const { imgUri, onReset } = useSignature();

  const { mutateAsync, isPending } = useDeliver(id);

  const hideModal = () => {
    onHide();
    onReset();
  };
  const mutate = async () => {
    await mutateAsync();
    hideModal();
  };
  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={hideModal}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          alignItems: 'center',
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            backgroundColor: '#D8D8D8',
            width: 50,
            height: 5,
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 50,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}
        >
          Customer's Signature
        </Text>
        <SignatureComponent />
        <View
          style={{
            backgroundColor: 'transparent, ',
            width: '80%',
            marginHorizontal: 'auto',
          }}
        >
          <MyButton
            title="Deliver"
            onPress={mutate}
            disabled={imgUri === null}
            loading={isPending}
          />
        </View>
      </View>
    </BottomSheet>
  );
};
