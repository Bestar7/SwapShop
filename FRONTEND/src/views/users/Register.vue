<template>
  <RegisterLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>


    <template v-slot:HEADER>
      <AppHeader :titre="$t('REGISTER.register')" />
    </template>


    <template v-slot:FORM>
      <Form.Register v-model="user" :onSubmit="submit" :onSucces="success" :cancel="cancel"/>
    </template>

  </RegisterLayout>
</template>

<script setup lang="ts">
import RegisterLayout from "./Register.layout.vue";
import AppHeader from "~/components/Header/AppHeader.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
import * as Form from "~/components/Form/Form";
import { createUser } from "~/services/users";

import { useRouter } from "vue-router";
import { ref, type Ref } from "vue";

const router = useRouter();

const submit = async (user: User) => {
  return await createUser(user);
}
const success = (_credentials: Credentials) => {
  router.push({ name: "catalog" });
}
const cancel = () => {
  router.go(-1);
}

const user : Ref<User> = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  wallet: Number(import.meta.env.VITE_STARTING_WALLET),
})

</script>