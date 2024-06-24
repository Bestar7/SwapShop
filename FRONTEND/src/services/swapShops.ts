import { AxiosError } from "axios";
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast";
const route = '/swapShops'

// TODO replace any => SwapShop
const getOneSwapShop = async (id: number): Promise<SwapShop> => {
  return await service.get(`${route}/${id}`)
    .then(response => response.data)
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR getOneSwapShop", e);
      useToastStore().setError("Error while getting the swap shop info :\n"+ e.response?.data.message);
    });
}

// TODO add update one

export {
  getOneSwapShop,
}