import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreId } from '../hooks/useAuth';
import { products } from './goods';
import { Delivered, PickUp, PrintData, ReturnT, ReturnType } from '../types';

export const useGetPickupQuery = (id: string) => {
  console.log('🚀 ~ useGetPickupQuery ~ id:', id);

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
export const useGeReturnList = () => {
  const { id } = useStoreId();
  return useQuery({
    queryKey: ['return', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryreturnedproductlist&agentid=${id}`
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

      return data as ReturnType[];
    },
  });
};
export const useGetReturn = (id: string | undefined) => {
  return useQuery({
    queryKey: ['returnList', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryreturncustomerproducts&agentid=1&myuserid${id}`
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

      return data as ReturnT[];
    },
  });
};

export type NameType = {
  customer: string;
  names: string;
};
export const useGeReturnName = () => {
  const { id } = useStoreId();
  return useQuery({
    queryKey: ['name', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryreturncustomers&agentid=${id}`
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
      let newArray = data?.map((item: { customer: string; names: string }) => {
        return {
          key: item?.customer,
          value: item?.names,
        };
      });
      return newArray;
    },
  });
};
