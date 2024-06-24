<template>
  <div class="text-3xl text-red-600">
    <span v-for="i in length" :key="i" v-on:click="setRating(i)">
      <span v-if="i <= value">&#9829;</span>
      <span v-else>&#9825;</span>
    </span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  length: number;
  isReadonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isReadonly: false
});
const value = defineModel<number>({required: true});

const setRating = (index:number) => {
  if (props.isReadonly) return;
  value.value = index;
}
</script>