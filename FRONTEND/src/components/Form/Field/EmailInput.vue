<template>
  <input type="email" v-model="value" required="true" class="focusable rounded-md border-gray-300 sm:text-sm" />
</template>
<script setup lang="ts">
import { defineModel } from 'vue';

const value = defineModel<string | undefined>({ required: true });
</script>