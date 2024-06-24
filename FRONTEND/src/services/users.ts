import { AxiosError } from "axios"
import { swapShopApi as service } from "~/config/services/axios"
import { useToastStore } from "~/stores/toast"
const route = '/users'

const createUser = async (newUser: User): Promise<Credentials> => {
  return await service.post(route, newUser)
    .then(response => {
      useToastStore().setSuccess("User created"); // TODO translate
      return response.data;
    })
    .catch((e: AxiosError<{message:string}>) => {
      console.log("ERROR createUser", e, newUser);
      useToastStore().setError("Error while creating the user :\n"+ e.response?.data.message);
    });
}

const connectUser = async (credentials: UnsafeCredentials): Promise<Credentials> => {
  return await service.post(`${route}/connect`, credentials)
  .then(response => {
    useToastStore().setSuccess("Connected");
    return response.data;
  })
  .catch((e: AxiosError<{message:string}>) => {
    console.log("ERROR connectUser", e);
    useToastStore().setError("Couldn't connect you, sorry :\n"+ e.response?.data.message);
  });
}

const me = async (): Promise<Credentials> => {
  return await service.get(`${route}/me`)
  .then(response => {
    return response.data;
  })
  .catch((e: AxiosError<{message:string}>) => {
    console.log("ERROR me", e);
    useToastStore().setError("An error occured, you might need to reload the page");
  });
}

const getOneUser = async (id: number): Promise<User> => {
  return await service.get(`${route}/${id}`)
  .then(response => {
    return response.data;
  })
  .catch((e) => {
    console.log("ERROR getOneUser", e);
    useToastStore().setError("An error occured");
  })
}

const getAllUsersSummary = async (): Promise<UserSummary[]> => {
  return await service.get(`${route}/summary`)
    .then(response => {
      return response.data;
    })
    .catch((e) => {
      console.log("ERROR getAllUsersSummary", e);
      useToastStore().setError("An error occured");
    })
}

const getAllUsers = async (): Promise<User[]> => {
  return await service.get(route)
    .then(response => {
      return response.data;
    })
    .catch((e) => {
      console.log("ERROR getAllUsers", e);
      useToastStore().setError("An error occured");
    })
}

export {
  createUser,
  connectUser,
  getOneUser,
  me,
  getAllUsers,
  getAllUsersSummary,
}