import { BottomSheet } from '@rneui/themed';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useSignature } from '../hooks/useGetSig';
import { MyButton } from './Mybutton';
import { SignatureComponent } from './SignatureComponent';
import { useDeliver } from '../libs/mutation';
type Props = {
  isVisible: boolean;
  id: string;
  onHide: () => void;
};

export const BottomComponent = ({ isVisible, onHide }: Props): JSX.Element => {
  const { imgUri, onReset } = useSignature();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeliver();

  const toast = useToast();
  const hideModal = () => {
    onHide();
    onReset();
  };
  const mutate = async () => {
    try {
      await mutateAsync();
      queryClient.invalidateQueries({ queryKey: ['pickup'] });
      queryClient.invalidateQueries({ queryKey: ['delivery'] });
      hideModal();
      router.push('/deliver');
      toast.show('Product has been delivered successfully', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } catch (error) {
      console.log('🚀 ~ mutate ~ error:', error);
      toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
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
