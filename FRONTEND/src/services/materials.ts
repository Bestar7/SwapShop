import { AxiosError } from "axios";
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast";
const route = '/materials'

const getAllMaterials = async (): Promise<Material[]> => {
  return await service.get(`${route}`)
    .then(response => response.data)
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR getAllMaterials", e);
      useToastStore().setError("Error while getting the list of material type :\n"+ e.response?.data.message);
    });
}

export {
  getAllMaterials,
}