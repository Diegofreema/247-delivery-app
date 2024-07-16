import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreId } from '../hooks/useAuth';
import { products } from './goods';
import {
  Delivered,
  HistoryType,
  PickUp,
  PrintData,
  ReturnT,
  ReturnType,
} from '../types';

export const useGetPickupQuery = (id: string) => {
  return useQuery({
    queryKey: ['pickup'],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverypickupdata&agentid=${id}`
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
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: true,
  });
};
export const useHistory = (
  id: string,
  lowerDate: string,
  higherDate: string
) => {
  const { profile } = useStoreId();
  return useQuery({
    queryKey: ['history', id, lowerDate, higherDate],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverymonthlydelivery&agentid=${profile.id}&lowerdate=${lowerDate}&higherdate=${higherDate}`
      );

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data as HistoryType[];
    },
  });
};
export const useGetPickupQuery2 = () => {
  const { profile } = useStoreId();

  return useQuery({
    queryKey: ['pickup2'],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverypickupdata&agentid=${profile.id}`
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
  const { profile } = useStoreId();
  return useQuery({
    queryKey: ['delivery'],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverylist&agentid=${profile?.id}`
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
  const { profile } = useStoreId();
  return useQuery({
    queryKey: ['delivery2'],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliverylist&agentid=${profile?.id}`
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
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryprint&saleid=${id}`
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
  const { profile } = useStoreId();
  return useQuery({
    queryKey: ['return', profile?.id],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryreturnedproductlist&agentid=${profile?.id}`
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
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryreturncustomerproducts&agentid=1&myuserid${id}`
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
  const { profile } = useStoreId();
  return useQuery({
    queryKey: ['name', profile?.id],
    queryFn: async () => {
      const response = await axios.get(
        `https://test.ngpoolsbetting.com.ng/api.aspx?api=deliveryreturncustomers&agentid=${profile?.id}`
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
