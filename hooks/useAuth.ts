import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { LoggedUserType } from '../types';

interface AuthStore {
  id: any;
  setId: (id: any) => void;
  removeId: () => void;
  getId: () => void;
}

const getUserId = async () => {
  const id = await AsyncStorage.getItem('id');
  return id;
};

export const useStoreId = create<AuthStore>((set) => ({
  id: null,
  setId: async (newId) => {
    set({ id: newId });
    try {
      await AsyncStorage.setItem('id', newId.toString());
    } catch (error) {
      console.error('Error storing ID in local storage:', error);
    }
  },
  removeId: async () => {
    set({ id: null });

    try {
      await AsyncStorage.removeItem('id');
    } catch (error) {
      console.error('Error removing ID from local storage:', error);
    }
  },
  getId: async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      set({ id: id });
    } catch (error) {
      console.error('Error getting ID from local storage:', error);
    }
  },
}));
