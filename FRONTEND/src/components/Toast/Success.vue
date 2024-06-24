<template>
  <div class="rounded-md bg-green-100 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800"> {{ toastStore.getMessage }} </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { useToastStore } from "~/stores/toast";
const toastStore = useToastStore();
</script>
