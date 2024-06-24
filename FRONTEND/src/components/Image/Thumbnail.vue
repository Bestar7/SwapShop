<template>
  <div class="relative aspect-1 overflow-hidden rounded-md" >
    <img
      :src="article.images![0].path /*TODO make it clean*/"
      :alt="article.name"
      class="absolute w-full h-full group-hover:opacity-75 object-cover"
    />
    <!--TODO handle if no image (should never happen)-->
    <div v-if="usersStore.isConnected()" class="relative z-10 grid grid-cols-5 gap-1 mx-1"><!--TODO move these in a component-->
      
      <!--HEART BTN-->
      <div class="col-span-1 pt-1">
        <button v-if="!favoriteStore.hasArticle(article)" v-on:click.prevent="favoriteStore.addArticle(article)" class="focusable rounded-md w-full">
          <HeartOutline class="text-black bg-white bg-opacity-40 rounded-md" />
        </button>
        <button v-else v-on:click.prevent="favoriteStore.removeArticle(article)" class="focusable rounded-md w-full">
          <HeartSolid class="text-black bg-white rounded-md bg-opacity-85" />
        </button>
      </div>

      <!--CART BTN-->
      <div v-if="usersStore.allowedRole([UserRole.ADMIN, UserRole.SHOP])" class="col-span-1 pt-1">
        <button v-if="!cartStore.hasArticle(article)" v-on:click.prevent="cartStore.addArticle(article)" class="focusable rounded-md w-full">
          <ShoppingCartOutline class="text-black bg-white rounded-md bg-opacity-40" />
        </button>
        <button v-else v-on:click.prevent="cartStore.removeArticle(article)" class="focusable rounded-md w-full">
          <ShoppingCartSolid class="text-black bg-white rounded-md bg-opacity-85" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon as ShoppingCartOutline } from "@heroicons/vue/24/outline";
import { ShoppingCartIcon as ShoppingCartSolid } from "@heroicons/vue/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/vue/24/solid";

import { useFavoriteArticleStore } from "~/stores/favoriteArticle";
import { useCartStore } from "~/stores/cart";
import { useUsersStore } from "~/stores/users/users";
import { UserRole } from '~/utils/user';

interface Props {
  article: Article;
}
defineProps<Props>();

const cartStore = useCartStore();
const favoriteStore = useFavoriteArticleStore();
const usersStore = useUsersStore();
</script>