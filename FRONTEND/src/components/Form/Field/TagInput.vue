<template>
  <div>
    <Multiselect v-model="value"  mode="tags" no-options-text="Taper pour créer un nouveau tag"
      :searchable="true"
      :create-option="true"
      :min-chars="1"
      :options="availableTags"
      :allow-absent="true"
    />
  </div>
</template>
<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { ref, watch, type Ref } from 'vue';

interface Props {
  availableTags: string[];
}
defineProps<Props>();
const tags = defineModel<{label:string}[] | undefined>({ required: true });
const value: Ref<string[] | undefined> = ref();

// this initialize the tags fields with article tags if there are any (once they've been fetched)
const unwatch = watch(tags, () => {
  value.value = tags.value?.map((tag) => tag.label);
  unwatch();
});

// this update the model ( from tags:string[] to tags: {label:string}[] )
watch(value, () => {
  tags.value = value.value?.map((tag) => {return {label: tag ?? ""}});
});
</script>