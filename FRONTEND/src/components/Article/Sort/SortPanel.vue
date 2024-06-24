<template>
  <div class="my-3">
    <span class="text-sm font-medium text-gray-700">Trier par</span>
  </div>

  <div class="my-3 flex">
    <!-- Trier par -->
    <!--
    <Dropdown
      :model-value="trierPar"
      :options="optionsTri"
      @update:model-value="(value) => $emit('update:trierPar', value)"
      z-index="z-10"
    ></Dropdown>
    -->

    <!-- Direction tri -->

    <Sort.By />
    <Sort.Direction />

  </div>
</template>

<script setup lang="ts">
import * as Sort from "./Sort";

//import Dropdown from "./DropdownView.vue";
</script>