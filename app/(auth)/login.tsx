import axios from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';
import { HeaderComponent } from '../../components/Header';
import { InputComponent } from '../../components/InputComponent';
import { Modal } from '../../components/Modal';
import { MyButton } from '../../components/Mybutton';
import { TextComponent } from '../../components/TextComponent';
import { defaultStyle } from '../../constants';
import { colors } from '../../constants/Colors';
import { useStoreId } from '../../hooks/useAuth';
import { api } from '../../libs/helper';
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const toast = useToast();
  const { setId, getId } = useStoreId();

  const router = useRouter();

  // const loginFunc = (subId: string) => {

  //   console.log('🚀 ~ loginFunc ~ id:', subId);
  // };

  const {
    values,
    touched,
    errors,
    handleChange,

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
      try {
        const formattedPassword = values.password
          .replace(/[#?\/\\%&]/g, '')
          .replace(/:/g, '');
        const response = await axios.post(
          `${api}=deliverylogin&emailaddress=${values.email}&pasword=${formattedPassword}`
        );
        console.log({ r: response });

        if (response?.data.result === 'incorrect credentials') {
          return toast.show('Incorrect credentials', {
            type: 'danger',
            placement: 'top',
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
        const stringData = JSON.stringify(values);
        SecureStore.setItem('credentials', stringData);
        // const stringId: string = response.data.toString();

        // registerIndieID(stringId, appId, appToken);

        getId();
        resetForm();
        router.replace('/(app)/(tabs)/');
      } catch (error) {
        console.log(error);
        toast.show('Something went wrong, please try again later', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
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
