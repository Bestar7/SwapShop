<template>
  <li>
    <router-link :to="to" class="flex items-center py-2 m-1 rounded-lg hover:bg-swapShop-200 group focusable">
      <span class="flex-1 ms-3 whitespace-nowrap">
        <slot />
      </span>
      <span v-if="nbr" class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{{nbr}}</span>
    </router-link>
  </li>
</template>

<script setup lang="ts">
interface Props {
  to: { name:string }
  toExternal?: { url:string }
  nbr?: number
}
defineProps<Props>()
</script>