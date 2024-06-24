<template>
  
  <Menu as="div" class="relative mr-4 inline-block text-left z-20">
    <div>
      <MenuButton class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-swapShop-500 focus:ring-offset-2 focus:ring-offset-gray-100" >
        Trier par
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
        <div class="py-1">
          <MenuItem v-slot="{active}" v-for="option in options" >
            <a :class="[active ? 'bg-swapShop-50 text-swapShop-800':'text-gray-700']" class="block px-4 py-2 text-sm hover:bg-gray-50" >
              {{ option.label }}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>



  
  <!--TODO replace emit and more (old version) with defineModel (see https://vuejs.org/guide/components/v-model.html)-->
</template>

<script setup lang="ts">
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

interface Props {
  options : { label: string, value: string }[],
}

defineProps<Props>();

type ZIndex = "z-0" | "z-10" | "z-20" | "z-30" | "z-40" | "z-50";
const zIndex = "z-30"

const isSelected = (ok :any) => { return Math.random() >= 0.5; };


</script>
