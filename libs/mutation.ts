import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router, useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { useStoreId } from '../hooks/useAuth';
import { useSignature } from '../hooks/useGetSig';
import { useReturnStore } from '../hooks/useReturn';
import { api } from './helper';
export const usePickUp = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const pickUp = async (id: string) => {
    const response = await axios.post(
      `${api}=deliverypickupbutton&saleid=${id}`
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
        toast.show('Product has been picked up', {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        return router.push('/');
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
    const response = await axios.post(`${api}=deliveryprint&saleid=${id}`);

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
      console.log(error);
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useDeliver = (id: string) => {
  console.log({ id });

  const toast = useToast();
  const { imgUri } = useSignature();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: async () => {
      const response = await axios.get(`${api}=deliverydelivered&saleid=${id}`);
      console.log('response', response.status, response.data);

      return response.data;
    },
    onSuccess: async () => {
      // console.log(data);

      const formData = new FormData();
      formData.append('sig', imgUri as string);
      formData.append('salesid', id as string);

      await fetch(`https://blog.247pharmacy.net/users/handlesignature`, {
        method: 'POST',
        body: formData,
      });

      // try {
      //   // Then try to parse it as JSON
      //   const data = JSON.parse(text);
      //   return data;
      // } catch (e) {
      //   console.error('🚀 ~ useDeliver ~ e:', e);
      //   // If it's not valid JSON, return the text response
      //   return text;
      // }

      // if (result.includes('failed') || result.includes('error')) {
      //   toast.show('Something went wrong, please try again later', {
      //     type: 'danger',
      //     placement: 'bottom',
      //     duration: 4000,
      //     animationType: 'slide-in',
      //   });
      //   return;
      // }
      router.push('/deliver');

      queryClient.invalidateQueries({ queryKey: ['pickup'] });
      queryClient.invalidateQueries({ queryKey: ['delivery'] });
      return toast.show('Product has been delivered successfully', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
    onError: (error) => {
      console.error('🚀 ~ useDeliver ~ error:', error);
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useReturn = (id: any) => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onGet } = useReturnStore();
  const returnFn = async () => {
    onGet(id);
    const response = await axios.post(
      `${api}=deliveryreturnbutton&saleid=${id}`
    );

    return response.data;
  };
  return useMutation({
    mutationKey: ['returnBtn'],
    mutationFn: returnFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['pickup', 'delivery'],
      });
      router.push(`/return/${id}`);
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
      console.log(error);
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useDeleteAccount = () => {
  const toast = useToast();
  const { profile, removeId } = useStoreId();
  const onDelete = async () => {
    const response = await axios.post(
      `https://247delivery.net/api.aspx?api=deleteaccount&agentid=${profile?.id}`
    );

    return response.data;
  };
  return useMutation({
    mutationFn: onDelete,
    onSuccess: () => {
      removeId();
      router.replace(`/login`);

      return toast.show('Your profile has been deleted', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
    onError: () => {
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
export const useReject = (id: string) => {
  const toast = useToast();
  const { profile } = useStoreId();
  const queryClient = useQueryClient();
  const onReject = async () => {
    const response = await axios.post(
      `https://247delivery.net/api.aspx?api=selectcloset&productsaleid=${id}&statename=${profile?.statename}&agentid=${profile?.id}`
    );

    return response.data;
  };
  return useMutation({
    mutationFn: onReject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });

      return toast.show('Your rejected a pickup', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
    onError: () => {
      return toast.show('Something went wrong, please try again later', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    },
  });
};
