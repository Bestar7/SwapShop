<template>
  <!-- Direction tri -->
  <span class="relative z-0 inline-flex rounded-md shadow-sm">
      <button
        type="button"
        :class="[
          ' relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium hover:bg-swapShop-50 focus:z-10 focus:border-swapShop-500 focus:outline-none focus:ring-1 focus:ring-swapShop-500 ',
          directionTri === 'asc'
            ? 'border-swapShop-300 bg-swapShop-100 text-swapShop-500'
            : 'border-gray-300 bg-white text-gray-500 ',
        ]"
        @click="directionTri = 'asc'"
      >
        <span class="sr-only">Croissant</span>
        <BarsArrowDownIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        :class="[
          'relative -ml-px inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium hover:bg-swapShop-50 focus:z-10 focus:border-swapShop-500 focus:outline-none focus:ring-1 focus:ring-swapShop-500',
          directionTri === 'desc'
            ? 'border-swapShop-300 bg-swapShop-100 text-swapShop-500'
            : 'border-gray-300 bg-white text-gray-500 ',
        ]"
        @click="directionTri = 'desc'"
      >
        <span class="sr-only">Décroissant</span>
        <BarsArrowUpIcon class="h-5 w-5" aria-hidden="true" />
      </button>
  </span>
</template>

<script setup lang="ts">
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/vue/24/outline";

let directionTri = "asc"
</script>