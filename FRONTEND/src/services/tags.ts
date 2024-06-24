import { swapShopApi as service } from "~/config/services/axios"
const route = '/tags'

const getAllTags = async (): Promise<any> => {
  return await service.get(`${route}`)
    .then(response => response.data)
    .catch((e) => console.log("ERROR getAllTags", e));
}

export {
  getAllTags,
}