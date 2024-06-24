<template>
  <div>
    <Multiselect
      v-model="user"
      :searchable="true"
      :options="options"
      :placeholder="'Pour qui'"
      :required="required"
    />
  </div>
</template>
<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { ref, watch, type Ref } from 'vue';
import { usersToOptions } from "~/utils/user";

interface Props {
  possibleUsers: User[];
  required?: boolean;
}
const props = defineProps<Props>()
const user = defineModel({ required: true });
const options: Ref<UserOption[]> = ref([]);

// this is just to 'initialize' options (once they've been fetched)
const unwatch = watch(props, ()=>{
  options.value = usersToOptions(props.possibleUsers);
  unwatch();
});
</script>