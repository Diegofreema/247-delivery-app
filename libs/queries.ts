import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreId } from '../hooks/useAuth';
import { products } from './goods';
import { Delivered, PickUp, PrintData } from '../types';

export const useGetPickupQuery = () => {
  const { id } = useStoreId();

  return useQuery({
    queryKey: ['pickup'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliverypickupdata&agentid=${id}`
      );

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as PickUp[];
    },
    // refetchInterval: 60000 / 2,
    refetchIntervalInBackground: true,
    staleTime: 60000 / 2,
  });
};
export const useGetPickupQuery2 = () => {
  const { id } = useStoreId();

  return useQuery({
    queryKey: ['pickup2'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliverypickupdata&agentid=${id}`
      );

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as PickUp[];
    },
  });
};
export const useGetDeliverQuery = () => {
  const { id } = useStoreId();
  return useQuery({
    queryKey: ['delivery'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliverylist&agentid=${id}`
      );

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as Delivered[];
    },
  });
};
export const useGetDeliverQuery2 = () => {
  const { id } = useStoreId();
  return useQuery({
    queryKey: ['delivery2'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliverylist&agentid=${id}`
      );

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as Delivered[];
    },
  });
};
// export const useGeReturn = (email?: string) => {
//   const { id } = useStoreId();
//   return useQuery({
//     queryKey: ['return', email],
//     queryFn: async () => {
//       const response = await

//       console.log('response', response.status);

//       let data = [];
//       if (Object.prototype.toString.call(response.data) === '[object Object]') {
//         data.push(response.data);
//       } else if (
//         Object.prototype.toString.call(response.data) === '[object Array]'
//       ) {
//         data = [...response.data];
//       }

//       return data as Delivered[];
//     },
//   });
// };
export const useGetPrint = (id: string) => {
  return useQuery({
    queryKey: ['printData', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryprint&saleid=${id}`
      );

      console.log('response', response.status);

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as PrintData[];
    },
  });
};
