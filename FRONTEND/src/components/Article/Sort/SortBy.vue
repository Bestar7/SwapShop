
import { log } from 'console';
<template>
  <MenuView as="div" :class="['relative mr-4 inline-block text-left', zIndex]">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-swapShop-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        optionSelectionnee?.label }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="value in ['a','bv','c']">
            <a
              @click="console.log('ok')"
              :class="[
                value=='a'
                  ? 'bg-swapShop-50 text-swapShop-800'
                  : 'text-gray-700',
                'block px-4 py-2 text-sm hover:bg-gray-50',
              ]"
            >
              label }}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </MenuView>
</template>

<script setup lang="ts">
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as MenuView,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const zIndex = "z-50";
</script>
