import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

export const usePickUp = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
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
        router.push('/(tabs)');
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
  const pickUp = async (id: string) => {
    const response = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliverydelivered&saleid=${id}`
    );
    await axios.post(` https://247pharmacy.net/Uploads/signature-${id}.png`);

    return response.data;
  };
  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: pickUp,
    onSuccess: (data) => {
      if (data === 'saved') {
        return toast.show('Product has been delivered successfully', {
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
  const pickUp = async (id: string) => {
    const response = await axios.post(
      `https://247api.netpro.software/api.aspx?api=deliveryreturnbutton&saleid=${id}`
    );

    return response.data;
  };
  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: pickUp,
    onSuccess: (data) => {
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
