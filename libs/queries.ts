import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreId } from '../hooks/useAuth';
import { products } from './goods';
import { PickUp, PrintData } from '../types';

export const useGetPickupQuery = () => {
  const { id } = useStoreId();
  console.log(id);

  return useQuery({
    queryKey: ['pickup'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliverypickupdata&agentid=${id}`
      );

      console.log(response, 'response');

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

      console.log('response', response.status);

      let data = [];
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        data.push(response.data);
      } else if (
        Object.prototype.toString.call(response.data) === '[object Array]'
      ) {
        data = [...response.data];
      }

      return data;
    },
  });
};
export const useGeReturn = () => {
  const { id } = useStoreId();
  return useQuery({
    queryKey: ['delivery'],
    queryFn: async () => {
      const response = await axios.get(
        `https://247api.netpro.software/api.aspx?api=deliveryreturnlist&agentid=1&emailaddress=jarcesoft@yahoo.com`
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

      return data;
    },
  });
};
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
