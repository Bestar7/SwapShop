<template>
  <div class="sticky top-0 z-50"><!--TODO remove bg-color-->
    <div class="relatives">
      <!--App Bar-->
      <div class="relative">
        <slot name="APP_BAR" />
      </div>

      <!--Drawer-->
      <div
        :class="[!isOpen ? '-translate-x-full' : '']"
        class="absolute transition-transform"
      >
        <slot name="DRAWER" />
      </div>

      <!--Toast (floating success/error message)-->
      <div
        :class="[!toast.isVisible ? '-translate-y-48 opacity-70' : '', ' transition-all']"
        class="absolute my-4 left-1/2 transform -translate-x-1/2"
      >
        <slot name="TOAST" />
        
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

interface Props {
  isOpen: boolean;
}
defineProps<Props>();

const toast = useToastStore();

</script>