import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStoreId } from '../hooks/useAuth';
import { products } from './goods';

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

      return data;
    },
  });
};
