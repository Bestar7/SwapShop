import { AxiosError } from "axios";
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast";
const route = '/images'

const createImages = async (images: File[], idArticle: number): Promise<ImageServerResponse[]> => {
  const data = new FormData();
  
  for (const img of images){
    data.append('file', img);// the name of the field ('file' here), must be the same as in backend (after FileInterceptor)
  }

  return await service.post(`${route}/upload/article/${idArticle}`, data)
    .then(response => response.data)
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR createImage", e);
      useToastStore().setError("Error while creating the image of the article :\n"+ e.response?.data.message);
    });
}

export {
  createImages,
}