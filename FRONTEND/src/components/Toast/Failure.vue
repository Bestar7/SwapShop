<template>
  <div class="rounded-md bg-red-200 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-900"> {{ toastStore.getMessage }} </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { useToastStore } from "~/stores/toast";
const toastStore = useToastStore();
</script>
