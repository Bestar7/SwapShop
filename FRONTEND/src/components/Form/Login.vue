<template>
  <form @submit.prevent="onFormSubmit" class="space-y-8" autocomplete="on">
    <!--<ErreurView :erreur="reseau.erreur" />-->

    <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 ">

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.LOGIN.email') }}
          <Input.Email v-model="unsafeCredentials.email" class="w-full" />
        </label>
      </div>

      <div class="col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.LOGIN.password') }}
          <Input.Password v-model="unsafeCredentials.password" :isRegister="false" class="w-full" />
        </label>
      </div>
    </div>

    <div class="flex justify-end">
      <button type="button" @click="() => cancel()" class="focusable clickableSecondary rounded-md border px-4 py-2 text-sm font-medium" >
        {{ $t('component.LOGIN.cancel') }}
      </button>

      <button type="submit"
        class="focusable clickableMain ml-3 rounded-md border px-4 py-2 text-sm font-medium"
      >
      {{ $t('component.LOGIN.login') }}
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">
import * as Input from './Field/Input';

interface Props {
  onSubmit: (unsafeCredentials: UnsafeCredentials) => Promise<Credentials>; // TODO can return something else than Item ?
  onSucces: (credentials: Credentials) => void;
  cancel: () => void;
}

const props = defineProps<Props>();
const unsafeCredentials = defineModel<UnsafeCredentials>({ required: true });

const onFormSubmit = async ()=>{
  const credentials = await props.onSubmit(unsafeCredentials.value);
  if (credentials)
    props.onSucces(credentials);
}
</script>
