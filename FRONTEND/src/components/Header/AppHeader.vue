<template>
  <h1 class="text-3xl font-bold leading-tight text-swapShop-700">
    {{ titre }}
  </h1>

  <!--<Breadcrumb
    :class="['text-swapShop-700', 'mt-8']"
    :dernierFragment="breadcrumb"
  ></Breadcrumb>-->
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useSwapShopStore } from '~/stores/swapShop';

const props = defineProps({
  titre: { type: String, default: null },
  //breadcrumb: { type: String, default: null },
});

const shop = useSwapShopStore();
useHead({
  title: shop.getSwapShop?.name+' > '+props.titre
})
</script>
