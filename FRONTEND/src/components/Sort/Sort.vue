<template>
  <div class="my-3">
    <span class="text-sm font-medium text-gray-700">Trier par</span><!--TODO text should NOT be put here-->
  </div>
  <div class="my-3 flex">
    
    <Dropdown :options="optionsTri" />
    
    <span class="relative z-0 inline-flex rounded-md shadow-sm">
      
      <Button.Asc :selected="true" />
      
      <Button.Desc :selected="true" />

    </span>
  </div>
</template>

<script setup lang="ts">
import * as Button from "~/components/Button/Button";
import Dropdown from "~/components/Dropdown/OrderBy.vue";

interface Props {
  optionsTri: { label: string, value: string }[];
}
defineProps<Props>();

/*
interface Model {
  sortOrder: string;
}
defineModel<Model>();
*/

</script>