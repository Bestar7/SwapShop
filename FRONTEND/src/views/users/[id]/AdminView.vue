<template>
  <AdminViewLayout>
    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>

    <template v-slot:HEADER>
      <AppHeader :titre="$t('USER_VIEW.dashboard')" />
    </template>


    <template v-slot:USER_INFO>
      <!--LOGOUT-->
      <div>
        <button v-on:click="logout" class="focusable clickableMain rounded-md p-2 font-medium">
          {{ $t('utils.logout') }}
        </button>
      </div>
    </template>

    <template v-slot:FAVORITES>
      <!--FAVORITES-->
      <div>
        <h2>Favorites</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6 " >
        <div v-for="article in favoriteStore.getArticles" :key="article.id" class="group relative" >
          <Card.ArticlePreview :article="article"/>
        </div>
      </div>
    </template>

    <!--
    <template v-slot:CHARTS>
      <Chart.Bar class="mb-16" />
    </template>
    -->

  </AdminViewLayout>
</template>

<script setup lang="ts">
// TODO onBeforeRouteLeave sent updated favorites to backend (we can remove favorite from view here)
import AdminViewLayout from './AdminView.layout.vue';
import AppHeader from "~/components/Header/AppHeader.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
//import * as Chart from "~/components/Chart/Chart"
import * as Card from "~/components/Card/Card";

import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from "vue-router";
import { useUsersStore } from '~/stores/users/users';
import { useFavoriteArticleStore } from '~/stores/favoriteArticle';

const favoriteStore = useFavoriteArticleStore();

const user: Ref<User | null> = ref(null);
const router = useRouter();
const userStore = useUsersStore();

onMounted(async ()=>{
  user.value = userStore.getMe();
});

const logout = ()=>{
  userStore.logout();
  router.push({ name: "catalog" });
}
</script>