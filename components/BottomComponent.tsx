import { StyleSheet, View, Text } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { SignatureComponent } from './SignatureComponent';
import { MyButton } from './Mybutton';
import { useState } from 'react';
import { BottomSheet } from '@rneui/themed';
import { useSignature } from '../hooks/useGetSig';
import { useDeliver } from '../libs/mutation';
import axios from 'axios';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
type Props = {
  isVisible: boolean;
  id: string;
  onHide: () => void;
};
const api = process.env.EXPO_PUBLIC_URL;
export const BottomComponent = ({
  isVisible,
  id,
  onHide,
}: Props): JSX.Element => {
  const { imgUri, onGet, salesId, onReset } = useSignature();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useDeliver();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const hideModal = () => {
    onHide();
    onReset();
  };
  const mutate = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `https://247api.netpro.software/api.aspx?api=deliverydelivered&saleid=${id}`
      );
      console.log('🚀 ~ mutate ~ res:', res);
      const response = await axios.post(
        `https://blog.247pharmacy.net/users/handlesignature`,
        {
          sig: imgUri,
          salesid: id,
        }
      );

      console.log('🚀 ~ mutationFn: ~ response:', response);
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['pickup', 'delivery'] });
      onReset();
      router.push('/(tabs)/deliver');
      toast.show('Product has been delivered successfully', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      return response;
    } catch (error) {
      console.log('🚀 ~ mutate ~ error:', error);
      console.log('🚀 ~ mutate ~ error:', 'error');
      toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } finally {
      setLoading(false);
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
            loading={loading}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({});
