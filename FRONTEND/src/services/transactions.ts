import { AxiosError } from "axios"
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast"
const route = '/transactions'

const createTransaction = async (transaction: Transactions): Promise<Transaction[]> => {
  return await service.post(route, transaction)
    .then(response => {
      useToastStore().setSuccess("Sucess !");
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR transaction", e, transaction);
      useToastStore().setError("An error occured :\n"+ e.response?.data.message);
    });
}

export {
  createTransaction,
}