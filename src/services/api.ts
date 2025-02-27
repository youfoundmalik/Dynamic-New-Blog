import { useCallback } from 'react';
import axios, { AxiosRequestConfig, isAxiosError } from "axios";

export const useApi = () => {
  const fetchData = useCallback(async (url: string, options?: AxiosRequestConfig) => {
    try {
      const response = await axios(url, options);
      return response;
    } catch (e) {
      if (isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error(e as string);
      }
    }
  }, []);

  return { callApi: fetchData };
};
