<template>
  <div>
    <label for="filtreTag" class="mb-3 block text-sm font-medium text-gray-700" >
      {{ $t('component.FILTER_TAG.filterByTag') }}
    </label>

    <Multiselect
      id="filtreTag"
      v-model="tagsFiltres"
      v-on:select="onTagSelectedLocal"
      v-on:deselect="onTagSelectedLocal"
      mode="tags"
      no-results-text="Aucun tag trouvé"
      placeholder="Rechercher par tag"
      :options="tagOptions"
      :searchable="true"
      :min-chars="1"
    />
  </div>
</template>

<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { ref, type Ref } from "vue";
import { useTagsStore } from "~/stores/tags/tags";

interface Props {
  onTagSelect: ()=>Promise<void>;
}
const props = defineProps<Props>();

const tagsStore = useTagsStore();

const tagsFiltres: Ref<string[]> = ref([]);
const onTagSelectedLocal = async () => {
  tagsStore.SelectedTags = tagsFiltres.value;
  props.onTagSelect();
}

const tagOptions: Ref<string[]> = ref([]);
tagsStore.$subscribe((_mutation, state) => {
  tagOptions.value = state.AllTags;
});
</script>