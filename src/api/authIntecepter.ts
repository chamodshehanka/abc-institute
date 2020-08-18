/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestConfig extends AxiosRequestConfig {
  metadata?: { skipHeaderAdd?: boolean; startTime?: number };
}

export function addAuthIntecepter(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async function addHeaders(config: RequestConfig) {
      const { metadata } = config;
      config.metadata = { ...metadata, startTime: Date.now() };
      if (config.metadata.skipHeaderAdd) {
        return config;
      }

      return config;
    },
    function onError(error) {
      return Promise.reject(error);
    }
  );
}
