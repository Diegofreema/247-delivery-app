import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { useSignature } from '../hooks/useGetSig';
import { useReturnStore } from '../hooks/useReturn';
import { useStoreId } from '../hooks/useAuth';

export const usePickUp = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useStoreId();
  const pickUp = async (id: string) => {
    console.log('id', id);
    const response = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliverypickupbutton&saleid=${id}`
    );
    console.log('response', response);

    return response.data;
  };
  return useMutation({
    mutationKey: ['pickUpBtn'],
    mutationFn: pickUp,
    onSuccess: (data) => {
      if (data === 'saved') {
        queryClient.invalidateQueries({ queryKey: ['pickup', 'delivery'] });
        router.push(`/(tabs)/${id}`);
        return toast.show('Product has been picked up', {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }

      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
    onError: (error) => {
      console.log('error', error);

      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const usePrint = () => {
  const toast = useToast();
  const pickUp = async (id: string) => {
    const response = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliveryprint&saleid=${id}`
    );

    return response.data;
  };
  return useMutation({
    mutationKey: ['print'],
    mutationFn: pickUp,
    onSuccess: (data) => {
      if (data !== '') {
        return toast.show('Printed successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
    },
    onError: (error) => {
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useDeliver = () => {
  const toast = useToast();
  const { imgUri, salesId } = useSignature();
  console.log('🚀 ~ useDeliver ~ imgUri:', imgUri);
  console.log('🚀 ~ useDeliver ~ salesId:', salesId);
  const formattedImgUri = imgUri?.split(',')[1];
  console.log('🚀 ~ useDeliver ~ formattedImgUri:', formattedImgUri);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: async () => {
      const response = await axios.post(
        `https://247api.netpro.software/api.aspx?api=uploadsignature&saleid=${salesId}&strB64Encoded=${formattedImgUri}`
      );

      console.log('🚀 ~ mutationFn: ~ response:', response);

      return response.data;
    },
    onSuccess: async (data) => {
      if (data?.includes("{ 'result': 'failed' }")) {
        toast.show('Something went wrong, please try again later', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        return;
      }
      router.push('/(tabs)/deliver');
      queryClient.invalidateQueries({ queryKey: ['pickup', 'delivery'] });
      return toast.show('Product has been delivered successfully', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
    onError: (error) => {
      console.log('🚀 ~ useDeliver ~ error:', error);
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useReturn = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onGet } = useReturnStore();
  const pickUp = async (id: string) => {
    onGet(id);
    const response = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliveryreturnbutton&saleid=${id}`
    );

    return response.data;
  };
  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: pickUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['pickup', 'delivery'],
      });
      router.push('/(tabs)/return');
      if (data !== '') {
        return toast.show('Product has been returned successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
    },
    onError: (error) => {
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
