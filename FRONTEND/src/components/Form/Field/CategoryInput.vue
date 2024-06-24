<template>
  <div>
    <Multiselect :required="true" mode="single" 
      :groups="true"
      :searchable="true"
      :options="options"
      :placeholder="'Choisir une catégorie'"
      v-on:change="(selected)=>category = selected"
    />
  </div>
</template>
<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { ref, watch, type Ref } from 'vue';
import { materialsToOptions } from "~/utils/materials";

interface Props {
  availableMaterials: Material[];
}
const props = defineProps<Props>();
const category = defineModel<Material | undefined>({ required: true });

const options: Ref<MaterialOption[] | undefined> = ref();

// this is just to 'initialize' options (once they've been fetched)
const unwatch = watch(props, ()=>{
  options.value = materialsToOptions(props.availableMaterials);
  unwatch();
});
</script>