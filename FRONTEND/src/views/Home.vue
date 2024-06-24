<template>
  <HomeLayout>


    <template v-slot:SWAP_SHOP_FEDERATION>
      {{ swapShop?.federation }}
    </template>


    <template v-slot:SWAP_SHOP_NAME>
      {{ swapShop?.name ?? 'Loading' }}
    </template>

    <template v-slot:SWAP_SHOP_DESCRIPTION>
      {{ swapShop?.description }}
    </template>


    <template v-slot:TO_CATALOG>
      <router-link :to="{ name: 'catalog' }" class="focus:outline-none"><!--TODO better :to and better router-link-->
        <span class="text-base font-medium hover:font-bold text-swapShop-700 hover:text-swapShop-600">
          {{$t('HOME.goToCatalog')}}<span aria-hidden="true"> &rarr;</span>
        </span>
      </router-link>
    </template>
    

  </HomeLayout>
</template>

<script setup lang="ts">
import HomeLayout from "~/views/Home.layout.vue";
import { computed } from "vue";
import { useSwapShopStore } from "~/stores/swapShop";

const swapShopStore = useSwapShopStore();

const swapShop = computed(() => {
  return swapShopStore.getSwapShop;
})

</script>
