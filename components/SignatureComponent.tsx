import { useRef, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import { MyButton } from './Mybutton';
import { useSignature } from '../hooks/useGetSig';
type Props = {};

export const SignatureComponent = ({}: Props): JSX.Element => {
  const ref = useRef<SignatureViewRef | null>(null);
  const { onGet, onReset } = useSignature();

  const [uri, setUri] = useState<string | null>(null);

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: string) => {
    console.log(signature);

    setUri(signature);
    onGet({ imgUri: signature, salesId: null });
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    if (ref) {
      setUri(null);
      ref?.current?.clearSignature();
      onReset();
    }
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref?.current?.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data: any) => {
    console.log(data);
  };
  return uri ? (
    <>
      <Image
        source={{ uri }}
        style={{
          width: 250,
          height: 250,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 8,
        }}
      />
      <View style={{ width: '80%', marginHorizontal: 'auto' }}>
        <MyButton
          title={'Retake'}
          onPress={handleClear}
          color={'black'}
          textColor={'white'}
        />
      </View>
    </>
  ) : (
    <Signature
      style={{
        width: 250,
        height: 250,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        zIndex: 1,
      }}
      ref={ref}
      onEnd={handleEnd}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onGetData={handleData}
      autoClear={true}
      descriptionText={'Sign'}
    />
  );
};

const styles = StyleSheet.create({});
