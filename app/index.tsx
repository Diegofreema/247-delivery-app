import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyle } from '../constants';
import { HeaderComponent } from '../components/Header';
import { TextComponent } from '../components/TextComponent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { colors } from '../constants/Colors';
import { InputComponent } from '../components/InputComponent';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { Modal } from '../components/Modal';
import { useStoreId } from '../hooks/useAuth';
import { useRouter } from 'expo-router';
import { MyButton } from '../components/Mybutton';
import { registerIndieID } from 'native-notify';
type Props = {};
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const appId = process.env.EXPO_PUBLIC_APP_ID;
const appToken = process.env.EXPO_PUBLIC_APP_TOKEN;
const Login = (props: Props) => {
  const toast = useToast();
  const { setId, getUser, setUser, id, getId, user } = useStoreId();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getId();
    getUser();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (id?.length > 0) {
      router.replace('/(tabs)/');
    }
  }, [mounted, id, router]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post(
        `https://247api.netpro.software/api.aspx?api=deliverylogin&emailaddress=${values.email}&pasword=${values.password}`
      );

      if (response?.data === 'incorrect credentials') {
        return toast.show('Incorrect credentials', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,

          animationType: 'slide-in',
        });
      }

      if (response.status !== 200) {
        return toast.show('Something went wrong, please try again later', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,

          animationType: 'slide-in',
        });
      }

      setId(response.data);
      registerIndieID(response.data, appId, appToken);
      resetForm();
      router.replace('/(tabs)');
    },
  });
  const errorMessageEmail = touched.email && errors.email && errors.email;
  const errorMessagePassword =
    touched.password && errors.password && errors.password;
  return (
    <>
      <Modal isSubmitting={isSubmitting} />
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={[defaultStyle.container, { marginTop: 30 }]}>
          <HeaderComponent>Login</HeaderComponent>
          <TextComponent styles={{ marginTop: 10 }}>
            Enter your login details to continue{' '}
          </TextComponent>
          <View style={{ marginTop: 20 }}>
            <>
              <InputComponent
                placeholder="Email"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                errorMessage={errorMessageEmail}
              />
            </>
            <>
              <InputComponent
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                secured
                errorMessage={errorMessagePassword}
              />
            </>
            <MyButton
              title="Login"
              onPress={handleSubmit}
              color={colors.btnColor}
            />
            {/* <Button
              color={colors.btnColor}
              onPress={() => router.push('/(tabs)')}
              buttonStyle={{ marginTop: 20, height: 50 }}
              radius={25}
              loading={isSubmitting}
            >
              Login
            </Button> */}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
