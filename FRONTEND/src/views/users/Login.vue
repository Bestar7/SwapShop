<template>
  <LoginLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>


    <template v-slot:HEADER>
      <AppHeader :titre="$t('LOGIN.login')" />
    </template>


    <template v-slot:FORM>
      <Form.Login v-model="unsafeCredentials" :onSubmit="submit" :onSucces="success" :cancel="cancel"/>
    </template>

  </LoginLayout>
</template>

<script setup lang="ts">
import LoginLayout from "./Login.layout.vue";
import AppHeader from "~/components/Header/AppHeader.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
import * as Form from "~/components/Form/Form";
import { connectUser } from "~/services/users";

import { useRouter } from "vue-router";
import { useUsersStore } from "~/stores/users/users";
import { ref, type Ref } from "vue";

const router = useRouter();
const usersStore = useUsersStore();

const submit = async (unsafeCredentials: UnsafeCredentials) => {
  return await connectUser(unsafeCredentials);
}
const success = (credentials: Credentials) => {
  usersStore.setAuth(credentials);
  router.push({ name: "catalog" });
}
const cancel = () => {
  router.go(-1)
}

const unsafeCredentials : Ref<UnsafeCredentials> = ref({
  email: "",
  password: "",
})
</script>