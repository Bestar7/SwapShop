<template>
  <form @submit.prevent="onFormSubmit" autocomplete="off" class="space-y-8">
    <!--<ErreurView :erreur="reseau.erreur" />-->

    <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 ">

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.firstName') }}
          <input type="text"  v-model="user.firstName" required="true" class="w-full focusable rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.lastName') }}
          <input type="text"  v-model="user.lastName" required="true" class="w-full focusable rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.email') }}
          <Input.Email v-model="user.email" class="w-full" />
        </label>
      </div>

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.phone') }}
          <Input.Phone v-model="user.phone" class="w-full" />
        </label>
      </div>

      <div class="col-span-3"><!--TODO add eye icon to show password + system recup mot de passe-->
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.password') }}
          <Input.Password v-model="user.password" :isRegister="true" class="w-full" />
        </label>
      </div>

      <!--TODO add champ wallet, in backend as well-->
      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.REGISTER.wallet') }}
          <input type="number" min="0" step="5" v-model="user.wallet" class="w-full focusable rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>
    </div>

    <div class="flex justify-end">
      <button type="button" @click="() => cancel()" class="focusable clickableSecondary rounded-md border px-4 py-2 text-sm font-medium" >
        {{ $t('component.REGISTER.cancel') }}
      </button>

      <button type="submit"
        class="ml-3 focusable clickableMain inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm"
      >
      {{ $t('component.REGISTER.submit') }}
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">
import * as Input from './Field/Input';

interface Props {
  onSubmit: (user: User) => Promise<Credentials>; // TODO can return something else than Item ?
  onSucces: (credentials: Credentials) => void;
  cancel: () => void;
}

const props = defineProps<Props>();
const user = defineModel<User>({ required: true });

const onFormSubmit = async ()=>{
  const credentials = await props.onSubmit(user.value);
  if (credentials) props.onSucces(credentials);
}
</script>
