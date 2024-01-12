import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoggedUserType } from '../types';

interface AuthStore {
  id: any;
  setId: (id: any) => void;
  removeId: () => void;
  getId: () => void;
}

export const useStoreId = create<AuthStore>((set) => ({
  id: null,
  setId: async (newId) => {
    try {
      await AsyncStorage.setItem('id', newId.toString());
      set({ id: newId });
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
      return null;
    }
  },
}));
