import { StyleSheet, View, Text } from 'react-native';

import { SignatureComponent } from './SignatureComponent';
import { MyButton } from './Mybutton';
import { useMemo, useRef, useState } from 'react';
import { BottomSheet } from '@rneui/themed';
import { useSignature } from '../hooks/useGetSig';
import { useDeliver } from '../libs/mutation';
import axios from 'axios';
type Props = {
  isVisible: boolean;
  id: string;
  onHide: () => void;
};

export const BottomComponent = ({
  isVisible,
  id,
  onHide,
}: Props): JSX.Element => {
  const { imgUri, onGet, salesId } = useSignature();

  const { isPending, mutateAsync } = useDeliver();
  const [loading, setLoading] = useState(false);

  const mutate = async () => {
    const formData = new FormData();

    formData.append('sig', 'imgUri' as string);

    formData.append('salesid', id as string);
    setLoading(true);
    try {
      const response = await axios.post(
        `https://blog.247pharmacy.net/users/handlesignature`,
        {
          sig: imgUri,
          salesid: id,
        }
      );

      console.log('🚀 ~ mutationFn: ~ response:', response);
      console.log('success');

      return response;
    } catch (error) {
      console.log('🚀 ~ mutate ~ error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={onHide}>
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
