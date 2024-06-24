<template>
  <span 
    class="relative -ml-px inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium hover:bg-swapShop-50 focus:z-10 focus:border-swapShop-500 focus:outline-none focus:ring-1 focus:ring-swapShop-500"
    :class="[ selected ? 'border-swapShop-300 bg-swapShop-100 text-swapShop-500' : 'border-gray-300 bg-white text-gray-500 ', ]"
  > <!--TODO move directionTri class from here-->
    <button type="button" @click="onClick">
      <BarsArrowDownIcon class="h-5 w-5" aria-hidden="true" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { BarsArrowDownIcon } from "@heroicons/vue/24/outline";

interface Props {
  selected: boolean
}
defineProps<Props>();

const onClick = () => {
  console.log("OrderAsc") // TODO this should be a prop
}
</script>