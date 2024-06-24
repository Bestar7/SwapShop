<template>
  <div class="relative w-full h-full aspect-1">
    <div class="relative w-full h-full">
      <div class="absolute">
        <img :src="values[index].path" class="w-full h-full object-cover aspect-1" />
      </div>
    </div>
    
    <button v-if="values.length > 1" v-on:click="goLeft" class="absolute top-1/2 left-0 py-1 px-4 rounded-md border border-swapShop-900 clickableMain focusable"><</button>
    <button v-if="values.length > 1" v-on:click="goRight" class="absolute top-1/2 right-0 py-1 px-4 rounded-md border border-swapShop-900 clickableMain focusable">></button>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';

  const index: Ref<number> = ref(0);
  const values = defineModel<Image[]>({required: true});
  const goLeft = () => {
    if (index.value === 0)
      index.value = values.value.length - 1;
    else
      index.value--;
  }
  const goRight = () => {
    if (index.value === values.value.length - 1)
      index.value = 0;
    else
      index.value++;
  }
</script>