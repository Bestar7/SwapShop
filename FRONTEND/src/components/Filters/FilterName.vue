<template>
  <div>
    <label for="filtreMateriau" class="mb-3 block text-sm font-medium text-gray-700">
      Filtrer
    </label>

    <div class="flex rounded-md shadow-sm">
      <div class="relative flex-grow focus-within:z-10">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="filtreMateriau"
          type="text"
          :value="filtre"
          @input="onFiltreInput"
          class="block h-10 w-full rounded-md border-gray-300 pl-10 text-sm focus:border-swapShop-500 focus:ring-swapShop-500 sm:hidden"
          placeholder="Rechercher"
        />
        <input
          id="filtreMateriau"
          type="text"
          :value="filtre"
          @input="onFiltreInput"
          class="hidden w-full rounded-md border-gray-300 pl-10 focus:border-swapShop-500 focus:ring-swapShop-500 sm:block sm:text-sm"
          placeholder="Rechercher"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon} from "@heroicons/vue/24/outline";

let filtre: any;// TODO
const onFiltreInput = () => console.log("onTagInput");
</script>