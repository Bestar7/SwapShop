import { AxiosError } from "axios"
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast"
const route = '/articles'

const createArticle = async (newItem: Article): Promise<Article> => {
  return await service.post(route, newItem)
    .then(response => {
      useToastStore().setSuccess("Article created");
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR createArticle", e, newItem);
      useToastStore().setError("Error while creating the article :\n"+ e.response?.data.message);
    });
}

const getOneArticle = async (id: number): Promise<Article> => {
  return await service.get(`${route}/${id}`)
    .then(response => {
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR getOneArticle", e);
      useToastStore().setError("An error occured :\n"+ e.response?.data.message);
    });
}

const getAllArticles = async (tags?: string[]): Promise<Article[]> => {
  return await service.get(route, {params: {tags: tags}})
    .then(response => {
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR getAllArticles", e);
      useToastStore().setError("An error occured :\n"+ e.response?.data.message);
    });
}

const updateOneArticle = async (newItem: Article): Promise<Article> => {
  return await service.put(route, newItem)
    .then(response => {
      useToastStore().setSuccess("Article modified");
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR updateOneArticle", e, newItem);
      useToastStore().setError("An error occured :\n"+ e.response?.data.message);
    });
}

export {
  createArticle,
  getOneArticle,
  getAllArticles,
  updateOneArticle,
}