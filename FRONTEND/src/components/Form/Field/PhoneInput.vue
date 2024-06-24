<template>
  <div>
    <input type="tel" v-model="model" class="w-full focusable rounded-md border-gray-300 sm:text-sm" />
  </div>
</template>
<script setup lang="ts">
import { defineModel} from 'vue';

const model = defineModel<string | undefined>({ required: true });
</script>