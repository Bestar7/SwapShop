<template>
  <NavBarLayout>

    <template v-slot:DRAWER_TOGGLE_OPEN ><!--TODO replace with only one slot, see NavBar.layout-->
      <Bars3Icon />
    </template>
    <template v-slot:DRAWER_TOGGLE_CLOSE >
      <XMarkIcon />
    </template>


    <template v-slot:MENU_MIDDLE_LINKS ><!--TODO replace with component-->
      <router-link :to="{ name:'catalog' }"  class="inline-block focusable rounded-md mx-1">
        <div class="rounded-md bg-swapShop-100 p-2 hover:bg-swapShop-200">
          <BookOpenIcon class="block h-6 w-6" />
        </div>
      </router-link>
      <router-link v-if="usersStore.allowedRole([UserRole.ADMIN, UserRole.SHOP])" :to="{ name:'checkout' }"  class="inline-block focusable rounded-md mx-1">
        <div class="rounded-md bg-swapShop-100 p-2 hover:bg-swapShop-200">
          <ShoppingCartIcon class="block h-6 w-6" />
        </div>
      </router-link>
    </template>

    
    <template v-slot:MENU_RIGHT_LINKS><!--TODO replace with component-->
      <div v-if="usersStore.allowedRole([UserRole.USER])">
        
        <div class="inline-block h-auto align-top text-end py-2">
          <p>{{ usersStore.getMe()?.wallet ?? 0}}&#129689;</p>
        </div>
        
        <router-link :to="{ name:'userView', params: { id: usersStore.getMe()!.id } }" class="inline-block">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <UserCircleIconSolid class="block h-6 w-6" />
          </div>
        </router-link>
        
        <div v-on:click="changeLang" class="inline-block align-top text-center">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <div class="block h-6 w-6">{{$t('LANG')}}</div>
          </div>
        </div>

      </div>

      <div v-else-if="usersStore.allowedRole([UserRole.SHOP])">
        <router-link :to="{ name:'register' }" class="inline-block focusable rounded-md mx-1">
          <div class="rounded-md bg-swapShop-100 p-2 hover:bg-swapShop-200">
            <UserPlusIcon class="block h-6 w-6" />
          </div>
        </router-link>
        <router-link :to="{ name:'shopView', params: { id: usersStore.getMe()!.id } }" class="inline-block focusable rounded-md mx-1">
          <div class="rounded-md bg-swapShop-100 p-2 hover:bg-swapShop-200">
            <UserCircleIconSolid class="block h-6 w-6" />
          </div>
        </router-link>
        <button v-on:click="changeLang" class="inline-block align-top text-center focusable rounded-md mx-1">
          <div class="rounded-md bg-swapShop-100 p-2 hover:bg-swapShop-200">
            <div class="block h-6 w-6">{{$t('LANG')}}</div>
          </div>
        </button>
      </div>

      <div v-else-if="usersStore.allowedRole([UserRole.ADMIN])">
        <router-link :to="{ name:'register' }" class="inline-block">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <UserPlusIcon class="block h-6 w-6" />
          </div>
        </router-link>
        <router-link :to="{ name:'adminView', params: { id: usersStore.getMe()!.id } }" class="inline-block">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <UserCircleIconSolid class="block h-6 w-6" />
          </div>
        </router-link>
        <div v-on:click="changeLang" class="inline-block align-top text-center">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <div class="block h-6 w-6">{{$t('LANG')}}</div>
          </div>
        </div>
      </div>

      <div v-else>
        <router-link :to="{ name:'login' }" class="inline-block">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <UserCircleIcon class="block h-6 w-6" />
          </div>
        </router-link>
        <div v-on:click="changeLang" class="inline-block align-top text-center">
          <div class="rounded-md bg-swapShop-100 p-2 mx-1 hover:bg-swapShop-200">
            <div class="block h-6 w-6">{{$t('LANG')}}</div>
          </div>
        </div>
      </div>
    </template>


    <template v-slot:DRAWER_LINKS>
      <DrawerLink :to="{ name:'index' }">Bonocaz</DrawerLink>
      <DrawerExtLink :to="{ url:'https://app.recuperatheque.org/catalogue.php?r=fourmilieresolbosch' }">Fourmilière</DrawerExtLink>
      <DrawerExtLink :to="{ url:'https://app.recuperatheque.org/catalogue.php?r=gilbard' }">Gilbard</DrawerExtLink>
    </template>


    <template v-slot:TOAST>
      <div v-if="toast.getMsgType === msgType.SUCCESS">
        <Toast.Success />
      </div>
      <div v-else-if="toast.getMsgType === msgType.ERROR">
        <Toast.Failure />
      </div>
    </template>

  </NavBarLayout>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon, BookOpenIcon, UserCircleIcon, UserPlusIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/vue/24/solid";
import DrawerLink from "./Drawer/Link/Link.vue"
import DrawerExtLink from "./Drawer/ExternalLink/ExternalLink.vue"
import * as Toast from "~/components/Toast/Toast"
import { useI18n } from 'vue-i18n';
import { UserRole } from '~/utils/user';
import { useUsersStore } from "~/stores/users/users";
import { useToastStore, msgType } from "~/stores/toast";
const toast = useToastStore();

import NavBarLayout from "./NavBar.layout.vue";
const usersStore = useUsersStore();

const { locale } = useI18n();
const changeLang = () => { // TODO handle this in different file
  if (locale.value === 'fr')
    locale.value = 'en';
  else if (locale.value === 'en')
    locale.value = 'xx';
  else
    locale.value = 'fr';
}
</script>