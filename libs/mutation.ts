import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router, useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { useSignature } from '../hooks/useGetSig';
import { useReturnStore } from '../hooks/useReturn';
import { useStoreId } from '../hooks/useAuth';
export const usePickUp = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profile } = useStoreId();
  const pickUp = async (id: string) => {
    console.log('id', id);
    const response = await axios.post(
      `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverypickupbutton&saleid=${id}`
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
    const response = await axios.post(
      `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryprint&saleid=${id}`
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
  console.log({ salesId });

  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deliver'],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('sig', imgUri as string);
      formData.append('salesid', salesId as string);

      const response = await fetch(
        `https://blog.247pharmacy.net/users/handlesignature`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formData,
        }
      );

      console.log('🚀 ~ mutationFn: ~ response:', response);
      return response.json();
    },
    onSuccess: async (data) => {
      console.log('🚀 ~ onSuccess: ~ data:', data);
      if (data?.includes("{ 'result': 'failed' }")) {
        toast.show('Something went wrong, please try again later', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        return;
      }
      // router.push('/(tabs)/deliver');
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
export const useReturn = (id: any) => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onGet } = useReturnStore();
  const returnFn = async () => {
    onGet(id);
    const response = await axios.post(
      `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryreturnbutton&saleid=${id}`
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
    onSuccess: (data) => {
      removeId();
      router.replace(`/login`);

      return toast.show('Your profile has been deleted', {
        type: 'success',
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });

      return toast.show('Your rejected a pickup', {
        type: 'success',
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
