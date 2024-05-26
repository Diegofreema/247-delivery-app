import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { LoggedUserType } from '../types';
export type User = { id: string; statename: string; agent: string };
interface AuthStore {
  profile: User;
  setId: (profile: { id: string; statename: string; agent: string }) => void;
  removeId: () => void;
  getId: () => void;
}

export const useStoreId = create<AuthStore>((set) => ({
  profile: {
    id: '',
    statename: '',
    agent: '',
  },
  setId: async (profile: { id: string; statename: string; agent: string }) => {
    set({ profile: profile });
    const stringy = JSON.stringify(profile);
    SecureStore.setItem('profile', stringy);
  },
  removeId: async () => {
    set({
      profile: {
        agent: '',
        statename: '',
        id: '',
      },
    });

    try {
      await SecureStore.deleteItemAsync('profile');
    } catch (error) {
      console.error('Error removing ID from local storage:', error);
    }
  },
  getId: () => {
    const profile = JSON.parse(SecureStore.getItem('profile') || '{}');
    if (profile) {
      set({ profile });
    } else {
      set({ profile: { agent: '', statename: '', id: '' } });
    }
  },
}));
