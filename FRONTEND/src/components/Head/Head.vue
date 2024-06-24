<template>
  <metainfo>
    <template v-slot:title="{ content }"> <!--TODO Read the doc about this-->
      {{ content ? `${content} | Souplothèque` : "Souplothèque" }} <!--TODO take this from .env-->
    </template>
  </metainfo>
</template>

<script setup lang="ts">
/*
import { onMounted } from "vue";
import { useMeta } from "vue-meta";
import { useParametresStore } from "~/store/parametres";

useMeta({ title: "" });

onMounted(() => {
  useParametresStore().getParametres();
});
*/
</script>