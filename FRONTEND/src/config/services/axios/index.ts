import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useUsersStore } from '~/stores/users/users';


const externalApi: AxiosInstance = axios.create({
  baseURL: "https://www.swapi.tech/api", // TODO used if multiple api need to be called
})

const _setAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${useUsersStore().getToken()}`;
    return config;
  });
}

const swapShopApi: AxiosInstance = (()=>{
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:4000/api" // TODO use .env file
  });
  _setAuthInterceptor(axiosInstance);
  return axiosInstance;
})();

export { swapShopApi, externalApi }