<template>
  <NavBarScaffold :isOpen="isOpen">

    <template v-slot:APP_BAR>
      <div class="bg-swapShop-50 w-auto mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-gray-200">
        <div class="h-16 flex justify-between">

          <button v-on:click="onClick" class="focusable inline-flex my-3 items-center justify-center aspect-1 rounded-md bg-swapShop-100 text-gray-400 hover:bg-swapShop-200 hover:text-gray-500">
            <div class="h-6 w-6">
              <!--TODO this should be only DRAWER_TOGGLE and the component calling this
              should manage himself v-if="!isOpen" v-else-->
              <slot v-if="!isOpen" name="DRAWER_TOGGLE_OPEN" />
              <slot v-else name="DRAWER_TOGGLE_CLOSE" />
            </div>
          </button>
          <div class="inline-flex flex-1 my-3 justify-between">

            <div class="inline-block mx-3">

              <slot name="MENU_MIDDLE_LINKS" />

            </div>

            <div class="inline-block ml-3">
              
              <slot name="MENU_RIGHT_LINKS" />
              
            </div>
          </div>
          
        </div>

      </div>
    </template>

    
    <template v-slot:DRAWER>
      <div class="relative h-dvh overflow-y-auto bg-swapShop-50 sm:w-64 w-48 p-4">
        <h5 class="text-base font-semibold text-gray-500 uppercase">{{$t('component.NAVBAR.swapShops')}}</h5><!--TODO translate-->
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <slot name="DRAWER_LINKS" />
          </ul>
        </div>
      </div>
    </template>


    <template v-slot:TOAST>
      <slot name="TOAST" />
    </template>

  </NavBarScaffold>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import NavBarScaffold from "./NavBar.scaffold.vue"

const isOpen: Ref<boolean> = ref(false);

const onClick = () => {
  isOpen.value = !isOpen.value
}
</script>