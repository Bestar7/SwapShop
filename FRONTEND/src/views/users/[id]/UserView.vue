<template>
  <UserViewLayout>
    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>

    <template v-slot:HEADER>
      <AppHeader :titre="$t('USER_VIEW.dashboard')" />
    </template>


    <template v-slot:USER_INFO>
      <!--USER INFO-->
      <div>
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          
          <!-- firstName -->
          <div class="sm:col-span-1">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.firstName')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.firstName ?? "-" }}
              </span>
            </dd>
          </div>

          <!-- lastName -->
          <div class="sm:col-span-1">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.lastName')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.lastName ?? "-" }}
              </span>
            </dd>
          </div>

          <!-- email -->
          <div class="sm:col-span-1">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.email')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.email ?? "-" }}
              </span>
            </dd>
          </div>

          <!-- phone -->
          <div class="sm:col-span-1">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.phone')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.phone  ?? "-"}}
              </span>
            </dd>
          </div>

          <!-- address -->
          <div class="sm:col-span-2">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.address')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.address ?? "-" }}
              </span>
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="font-medium text-gray-500">{{$t('USER_VIEW.wallet')}}</dt>
            <dd class="text-base text-gray-900">
              <span class="rounded bg-gray-100 px-2 py-0.5 text-gray-600" >
                {{ user?.wallet ?? "-" }}&#129689;
              </span>
            </dd>
          </div>

        </dl>

      </div>

      <!--LOGOUT-->
      <div class="mt-10">
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
      <Chart.Bar />
    </template>
    -->

  </UserViewLayout>
</template>

<script setup lang="ts">
// TODO onBeforeRouteLeave sent updated favorites to backend (we can remove favorite from view here)
import UserViewLayout from './UserView.layout.vue';
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