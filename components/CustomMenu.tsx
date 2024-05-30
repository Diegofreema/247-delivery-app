import { FontAwesome } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useStoreId } from '../hooks/useAuth';
import { router } from 'expo-router';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { MyButton } from './Mybutton';
import { Divider } from '@rneui/themed';
import { useDelete } from '../hooks/useDelete';
type Props = {};

export const CustomMenu = ({}: Props): JSX.Element => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { removeId, profile } = useStoreId();

  const { onOpen } = useDelete();

  const showSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const onLogout = () => {
    if (!actionSheetRef.current) return;
    removeId();
    router.replace('/login');
    actionSheetRef?.current?.hide();
  };
  const onDeleteAccount = () => {
    if (!actionSheetRef.current) return;
    actionSheetRef?.current?.hide();
    onOpen();
  };
  return (
    <>
      <Pressable
        onPress={showSheet}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          paddingHorizontal: 5,
        })}
      >
        <FontAwesome name="ellipsis-v" color="green" size={25} />
      </Pressable>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ height: 200, padding: 10, gap: 10 }}
      >
        <Pressable
          onPress={onLogout}
          style={({ pressed }) => [styles.con, { opacity: pressed ? 0.5 : 1 }]}
        >
          <FontAwesome name="sign-out" color="black" size={30} />
          <Text style={styles.text}>Logout</Text>
        </Pressable>
        <Divider style={{ marginBottom: 10 }} />
        <Pressable
          onPress={onDeleteAccount}
          style={({ pressed }) => [styles.con, { opacity: pressed ? 0.5 : 1 }]}
        >
          <FontAwesome name="trash" color="red" size={30} />
          <Text style={styles.text}>Delete Account</Text>
        </Pressable>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    fontFamily: 'Poppins',
  },
});
